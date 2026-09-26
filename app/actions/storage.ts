'use server';

import { createClient } from '@/lib/supabase/server';
import { getPresignedUploadUrl, getPresignedDownloadUrl, getPublicAssetUrl } from '@/lib/storage/r2';

/**
 * Server Action to generate a presigned upload URL for direct browser uploads to R2
 */
export async function getUploadUrlAction({
  filename,
  contentType,
  folder = 'uploads',
}: {
  filename: string;
  contentType: string;
  folder?: 'logos' | 'covers' | 'products' | 'documents' | 'uploads';
}) {
  try {
    // Sanitize filename
    const cleanName = filename.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
    const uniqueKey = `${folder}/${Date.now()}-${cleanName}`;

    const { uploadUrl, key, publicUrl } = await getPresignedUploadUrl({
      key: uniqueKey,
      contentType,
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
