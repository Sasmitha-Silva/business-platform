import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 Client configured for Cloudflare R2
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || 'rotaract-business-assets';
const publicUrlBase = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKeyId || '',
    secretAccessKey: secretAccessKey || '',
  },
});

/**
 * Generate a temporary presigned URL for direct browser-to-R2 upload
 */
export async function getPresignedUploadUrl({
  key,
  contentType,
  expiresInSeconds = 300, // 5 minutes default
}: {
  key: string;
  contentType: string;
  expiresInSeconds?: number;
}) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(r2Client, command, {
    expiresIn: expiresInSeconds,
  });

  return {
    uploadUrl,
    key,
    publicUrl: getPublicAssetUrl(key),
  };
}

/**
 * Generate a temporary presigned URL for private document download/viewing
 * (e.g. GST and DRR certificates for moderators and admins)
 */
export async function getPresignedDownloadUrl({
  key,
  expiresInSeconds = 900, // 15 minutes default
}: {
  key: string;
  expiresInSeconds?: number;
}) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return await getSignedUrl(r2Client, command, {
    expiresIn: expiresInSeconds,
  });
}

/**
 * Get public CDN URL for public assets (logos, cover photos, product gallery)
 */
export function getPublicAssetUrl(key: string): string {
  if (!publicUrlBase) {
    return `/api/storage/${key}`;
  }
  const cleanBase = publicUrlBase.replace(/\/+$/, '');
  const cleanKey = key.replace(/^\/+/, '');
  return `${cleanBase}/${cleanKey}`;
}

/**
 * Delete an object from Cloudflare R2
 */
export async function deleteR2Object(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return await r2Client.send(command);
}

/**
 * Server-side upload buffer helper (for small assets generated on server)
 */
export async function uploadBufferToR2({
  key,
  buffer,
  contentType,
}: {
  key: string;
  buffer: Buffer | Uint8Array;
  contentType: string;
}) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await r2Client.send(command);

  return {
    key,
    publicUrl: getPublicAssetUrl(key),
  };
}
