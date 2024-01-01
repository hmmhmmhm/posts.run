import { createNewYearImagePrompt } from "@/lib/prompt/new-year-image";
import { uploadImageFile } from "@/lib/storage/r2Client";
import OpenAI from "openai";

export const maxDuration = 30;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { color, style, additionalPrompt } = await request.json();
  let generatedImageUrl = "https://placehold.co/600x400";

  try {
    if (color?.length > 30) throw new Error("Too long color");
    if (style?.length > 30) throw new Error("Too long style");
    if (additionalPrompt?.length > 200)
      throw new Error("Too long additional prompt");

    const response = await openai.images.generate({
      model: "dall-e-3",
      size: "1024x1024",
      quality: "standard",
      prompt: createNewYearImagePrompt
        .replace("[$color]", color ?? "Red")
        .replace("[$imageStyle]", style ?? "Van Gogh")
        .replace("[$additionalPrompt]", additionalPrompt ?? ""),
    });

    const temporaryUrl = response.data?.[0]?.url;
    if (!temporaryUrl) throw new Error("No temporary URL");

    const imageResponse = await fetch(temporaryUrl);
    generatedImageUrl = await uploadImageFile({
      buffer: await imageResponse.arrayBuffer(),
      folder: "new-year-ai-images",
      info: JSON.stringify({
        color,
        style,
        additionalPrompt,
      }),
    });
  } catch (e) {}

  return Response.json({ generatedImageUrl });
}
