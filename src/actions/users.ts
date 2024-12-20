"use server";

import { v4 as uuidv4 }  from "uuid";
import { sql } from "@vercel/postgres";
import { getSession, removeSession } from "@/actions/session";
import { AuthInputsType, NameInputsType, UserType } from "@/lib/definitions";
import bcrypt from "bcryptjs";

export async function getUser(email: string) {
  let user: UserType | null = null;
  const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
  const userExists = rows.length > 0;

  if (userExists) {
    user = Object.assign({...rows[0]});
  }
  return user;
}
  
export async function setEditor({ email, password }: AuthInputsType) {
  const id = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  
  await sql`
    INSERT INTO users (id, email, password, role, verified)
    VALUES (${id}, ${email}, ${hashedPassword}, 'editor', false)
    ON CONFLICT (id) DO NOTHING
  `;
  return id;
}

export async function updateVerified(email: string) {
  await sql`
    UPDATE users
    SET verified = true
    WHERE email = ${email}
  `;
  return email;
}

export async function updatePassword({ email, password }: AuthInputsType) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  await sql`
    UPDATE users
    SET password = ${hashedPassword}
    WHERE email = ${email}
  `;
  return email;
}

export async function updateName({ id, name }: NameInputsType) {
  await sql`
    UPDATE users
    SET name = ${name}
    WHERE id = ${id}
  `;
  return id;
}

export async function removeUser() {
  const { id } = await getSession();

  await sql`
    DELETE FROM users
    WHERE id = ${id}
  `;
  removeSession();
  return id;
}