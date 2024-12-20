"use server";

import { v4 as uuidv4 }  from "uuid";
import { sql } from "@vercel/postgres";
import { RestorePassType, EmailInputType } from "@/lib/definitions";

export async function setCodeAuth({ email }: EmailInputType) {
  const id = uuidv4();

  await sql`
    INSERT INTO codes (id, email)
    VALUES (${id}, ${email})
    ON CONFLICT (id) DO NOTHING
  `;
  return id;
}

export async function verifyCodeAuth({ email, code }: RestorePassType) {
  const { rows } = await sql`SELECT id FROM codes WHERE email = ${email} AND id = ${code} ORDER BY date DESC LIMIT 1`;
  const codeExists = (rows.length > 0);
  return codeExists;
}
  
export async function removeCodeAuth({ email, code }: RestorePassType) {
  const { rows } = await sql`DELETE FROM codes WHERE email = ${email} AND id = ${code}`;
  const isRemoved = (rows.length > 0);
  return isRemoved;
}