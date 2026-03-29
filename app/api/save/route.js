import { pool } from "../../lib/db";

export async function POST(req) {
  const { content, summary } = await req.json();

  const result = await pool.query(
    "INSERT INTO notes(content, summary) VALUES($1,$2) RETURNING *",
    [content, summary]
  );

  return Response.json(result.rows[0]);
}