"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import "server-only";

import { auth } from "@/core/auth/auth";
import { STORAGE_BUCKET, STORAGE_PUBLIC_URL, s3 } from "@/core/s3";
import { ActionResult } from "@/shared/types";

const ALLOWED_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const PRESIGNED_URL_TTL_SECONDS = 60 * 5;

interface ProductImageUpload {
  name: string;
  type: string;
  size: number;
}

export async function getProductImageUploadUrlAction(
  file: ProductImageUpload,
): Promise<ActionResult<{ url: string; imageUrl: string }>> {
  const reqHeaders = await headers();
  const { success: hasPermission } = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        product: ["create"],
      },
    },
  });

  if (!hasPermission) {
    return {
      success: false,
      data: null,
      error: "Недостатньо прав для виконання цієї дії",
    };
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    return {
      success: false,
      data: null,
      error: "Дозволені лише зображення PNG, JPG або WEBP",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      data: null,
      error: "Розмір файлу перевищує 5MB",
    };
  }

  try {
    const key = `products/${randomUUID()}.${extension}`;

    const url = await getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: STORAGE_BUCKET,
        Key: key,
        ContentType: file.type,
      }),
      { expiresIn: PRESIGNED_URL_TTL_SECONDS },
    );

    return {
      success: true,
      data: {
        url,
        imageUrl: `${STORAGE_PUBLIC_URL}/${key}`,
      },
    };
  } catch {
    return {
      success: false,
      data: null,
      error: "Не вдалося сформувати посилання для завантаження",
    };
  }
}
