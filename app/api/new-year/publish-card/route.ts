import { createClient } from "@supabase/supabase-js";
import { encode } from "pseudo-shuffle";
import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();

export const runtime = "nodejs";
interface NewYearCard {
  message: string;
  to: string;
  images: string[];
}

const schema: JSONSchemaType<NewYearCard> = {
  type: "object",
  properties: {
    message: { type: "string", minLength: 20, maxLength: 80 },
    to: { type: "string", minLength: 1, maxLength: 20 },
    images: {
      type: "array",
      minItems: 0,
      maxItems: 4,
      items: { type: "string" },
    },
  },
  required: ["message", "to"],
};

const shuffleConfig = {
  min: 0,
  max: 36 ** 6 - 1,
  privateKey: process.env.SHUFFLE_PRIVATE_KEY!,
};

export async function POST(request: Request) {
  const { message, to, images } = (await request.json()) as NewYearCard;
  const validate = ajv.compile(schema);

  if (!validate({ message, to, images }))
    return Response.json({ error: "invalid request" }, { status: 400 });

  const serverClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const response = await serverClient
    .from("new_year_cards")
    .insert({
      message,
      to,
      images,
    })
    .select();

  const insertedData = response.data?.[0] as
    | (NewYearCard & { id: number })
    | undefined;
  if (!insertedData) {
    return Response.json({ error: "insert failed" }, { status: 500 });
  }
  const safeCardCode = encode({
    index: insertedData.id,
    ...shuffleConfig,
  }).toString(36);

  const publishUrl = `https://posts.run/new-year/${safeCardCode}`;
  return Response.json({ publishUrl });
}
