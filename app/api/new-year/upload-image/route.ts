import { uploadImageFile } from "@/lib/storage/r2Client";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  const uploadedImageUrl = await uploadImageFile({
    buffer: await file.arrayBuffer(),
    folder: "new-year-user-images",
    info: JSON.stringify({
      name: file.name,
    }),
  });

  return Response.json({ uploadedImageUrl });
}
