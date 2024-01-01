import { decode } from "pseudo-shuffle";
import { shuffleConfig } from "../publish-card/route";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const { id } = await request.json();

  try {
    const index = parseInt(id, 36);
    const secretId = decode({
      index,
      ...shuffleConfig,
    });

    if (Number.isNaN(secretId)) throw new Error("Invalid ID");

    const serverClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const response = await serverClient
      .from("new_year_cards")
      .select("*")
      .eq("id", secretId);

    const card = response.data?.[0];
    if (!card) throw new Error("No card");

    return Response.json({
      message: card.message,
      to: card.to,
      images: card.images,
    });
  } catch (e) {}

  return Response.json({ error: "invalid request" }, { status: 400 });
}
