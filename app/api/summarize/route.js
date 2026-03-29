import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { text } = await req.json();

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Summarize the text." },
      { role: "user", content: text },
    ],
  });

  return Response.json({
    summary: response.choices[0].message.content,
  });
}