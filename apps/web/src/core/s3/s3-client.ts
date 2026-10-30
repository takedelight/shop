import "server-only";
import { S3Client } from "@aws-sdk/client-s3";

export const STORAGE_BUCKET = process.env.STORAGE_BUCKET_NAME!;

export const STORAGE_PUBLIC_URL =
  process.env.STORAGE_PUBLIC_URL ??
  `${process.env.STORAGE_ENDPOINT}/${process.env.STORAGE_BUCKET_NAME}`;

export const s3 = new S3Client({
  region: process.env.STORAGE_REGION ?? "us-east-1",
  endpoint: process.env.STORAGE_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY!,
    secretAccessKey: process.env.STORAGE_SECRET_KEY!,
  },
});
