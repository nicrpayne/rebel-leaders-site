import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { ENV } from "./_core/env";
import { randomUUID } from "crypto";

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${ENV.r2AccountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ENV.r2AccessKeyId,
    secretAccessKey: ENV.r2SecretAccessKey,
  },
});

export async function uploadWallImage(
  imageBuffer: Buffer,
  contentType: string,
  wallCode: string
): Promise<string> {
  const ext = contentType === "image/png" ? "png"
    : contentType === "image/webp" ? "webp" : "jpg";
  const key = `wall/${wallCode}/${randomUUID()}.${ext}`;

  await r2Client.send(
    new PutObjectCommand({
      Bucket: ENV.r2BucketName,
      Key: key,
      Body: imageBuffer,
      ContentType: contentType,
    })
  );

  return `${ENV.r2PublicUrl}/${key}`;
}

export async function uploadWallHeader(
  imageBuffer: Buffer,
  contentType: string,
  wallCode: string
): Promise<string> {
  const ext = contentType === "image/png" ? "png"
    : contentType === "image/webp" ? "webp" : "jpg";
  const key = `wall-headers/${wallCode}/header.${ext}`;

  await r2Client.send(
    new PutObjectCommand({
      Bucket: ENV.r2BucketName,
      Key: key,
      Body: imageBuffer,
      ContentType: contentType,
    })
  );

  return `${ENV.r2PublicUrl}/${key}`;
}
