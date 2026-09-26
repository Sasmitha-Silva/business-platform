'use server';

import { createClient } from '@/lib/supabase/server';
import { getPresignedUploadUrl, getPresignedDownloadUrl, getPublicAssetUrl } from '@/lib/storage/r2';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'application/pdf',
];

const ALLOWED_FOLDERS = ['logos', 'covers', 'products', 'documents', 'uploads'] as const;
type AllowedFolder = (typeof ALLOWED_FOLDERS)[number];

/**
 * Server Action to generate a presigned upload URL for direct browser uploads to R2
 * SEC-005: Enforces authentication
 * SEC-006: Enforces MIME-type allowlist and folder sanitization
 */
export async function getUploadUrlAction({
  filename,
  contentType,
  folder = 'uploads',
}: {
  filename: string;
  contentType: string;
  folder?: AllowedFolder;
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Authentication required to upload files.' };
    }

    const cleanContentType = contentType.toLowerCase().trim();
    if (!ALLOWED_MIME_TYPES.includes(cleanContentType)) {
      return {
        success: false,
        error: `File type "${contentType}" is not supported. Allowed formats: JPEG, PNG, WebP, GIF, SVG, PDF.`,
      };
    }

    const targetFolder = ALLOWED_FOLDERS.includes(folder) ? folder : 'uploads';

    // Sanitize filename
    const cleanName = filename.toLowerCase().replace(/[^a-z0-9.-]/g, '-').slice(0, 80);
    const uniqueKey = `${targetFolder}/${Date.now()}-${cleanName}`;

    const { uploadUrl, key, publicUrl } = await getPresignedUploadUrl({
      key: uniqueKey,
      contentType: cleanContentType,
      expiresInSeconds: 300, // 5 minutes
    });

    return {
      success: true,
      uploadUrl,
      key,
      publicUrl,
    };
  } catch (error: any) {
    console.error('Error generating presigned upload URL:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate upload URL',
    };
  }
}

/**
 * Server Action to generate a short-lived download URL for private verification documents
 * SEC-007: Enforces document-level authorization (Owner, assigned Moderator, or Super Admin)
 */
export async function getPrivateDocumentUrlAction(fileKey: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    // 1. Fetch user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    const isSuperAdmin = profile?.role === 'super_admin';

    if (!isSuperAdmin) {
      // 2. Fetch document and business information to check ownership / district
      const { data: docRecord } = await supabase
        .from('verification_documents')
        .select(`
          business_id,
          business:businesses(owner_id, district_number)
        `)
        .eq('file_key', fileKey)
        .maybeSingle();

      if (!docRecord) {
        return { success: false, error: 'Document not found' };
      }

      const business = docRecord.business as any;
      const isOwner = business?.owner_id === user.id;

      if (!isOwner) {
        if (profile?.role === 'moderator') {
          // Check if assigned to this district
          const { data: assignment } = await supabase
            .from('moderator_assignments')
            .select('id')
            .eq('moderator_id', user.id)
            .eq('district_number', business?.district_number)
            .maybeSingle();

          if (!assignment) {
            return { success: false, error: 'Access denied: document is outside assigned district' };
          }
        } else {
          return { success: false, error: 'Access denied: insufficient permissions to view document' };
        }
      }
    }

    // Generate signed download URL (valid for 15 minutes)
    const downloadUrl = await getPresignedDownloadUrl({
      key: fileKey,
      expiresInSeconds: 900,
    });

    return {
      success: true,
      downloadUrl,
    };
  } catch (error: any) {
    console.error('Error generating presigned download URL:', error);
    return {
      success: false,
      error: error.message || 'Failed to retrieve document URL',
    };
  }
}

/**
 * Server Action to delete an asset from Cloudflare R2 storage
 */
export async function deleteStorageObjectAction(urlOrKey: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    if (!urlOrKey) {
      return { success: false, error: 'No key provided' };
    }

    // Extract key if full URL was passed
    let key = urlOrKey;
    try {
      if (urlOrKey.startsWith('http://') || urlOrKey.startsWith('https://')) {
        const parsed = new URL(urlOrKey);
        key = parsed.pathname.replace(/^\/+/, '');
      }
    } catch {
      key = urlOrKey.replace(/^\/+/, '');
    }

    // Safety constraint: only allow deleting assets from known upload folders
    const allowedPrefixes = ['logos/', 'covers/', 'products/', 'documents/', 'uploads/'];
    const isAllowed = allowedPrefixes.some((p) => key.startsWith(p));
    if (!isAllowed) {
      return { success: false, error: 'Invalid object key' };
    }

    const { deleteR2Object } = await import('@/lib/storage/r2');
    await deleteR2Object(key);

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting object from R2:', error);
    return { success: false, error: error.message || 'Failed to delete file from storage' };
  }
}


