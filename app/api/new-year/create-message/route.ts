import { createGreetingMessagePrompt } from "@/lib/prompt/greeting-message";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  let generatedMessage = "새해 복 많이 받으세요!";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: createGreetingMessagePrompt,
        },
      ],
    });

    const responsedMessage = response.choices[0].message.content;
    if (responsedMessage) generatedMessage = responsedMessage;
  } catch (e) {}

  return Response.json({ generatedMessage });
}
