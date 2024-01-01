import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import sharp from "sharp";

export const r2Client = new S3({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export const R2_BUCKET = { bucketName: process.env.R2_BUCKET_NAME } as const;

export const uploadImageFile = async ({
  buffer,
  folder,
  info,
}: {
  buffer: ArrayBuffer;
  folder: string;
  info?: string;
}): Promise<string> => {
  const imageId = nanoid();
  const compressedBuffer = await sharp(buffer).webp().toBuffer();
  const command: PutObjectCommand = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: `${folder}/${imageId}`,
    Body: compressedBuffer,
    ACL: "public-read",
    ContentType: "image/webp",
    ...(info && { Metadata: { info } }),
  });
  await r2Client.send(command);
  return `${process.env.STATIC_URL}/${folder}/${imageId}`;
};
