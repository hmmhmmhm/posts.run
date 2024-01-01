import { createNewYearImagePrompt } from "@/lib/prompt/new-year-image";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { color, style, additionalPrompt } = await request.json();
  let generatedImageUrl = "";

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      size: "1792x1024",
      quality: "standard",
      prompt: createNewYearImagePrompt
        .replace("[$color]", color ?? "Red")
        .replace("[$imageStyle]", style ?? "Van Gogh")
        .replace("[$additionalPrompt]", additionalPrompt ?? ""),
    });

    const responseImageUrl = response.data?.[0]?.url;
    if (responseImageUrl) generatedImageUrl = responseImageUrl;

    // TODO Cloudflare R2 Storage에 이미지 업로드 후 해당 URL 반환
  } catch (e) {}

  return Response.json({ generatedImageUrl });
}
