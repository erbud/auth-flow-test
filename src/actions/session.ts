"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SessionType } from "@/lib/definitions";

const alg = "HS256";
const key = new TextEncoder().encode(process.env.AUTH_SECRET);

async function getExpiryDate() {
  const now = new Date();
  const weeks = 1;
  
  return now.setDate(now.getDate() + weeks * 7);
}

async function encrypt(payload: any) {
  const expires = await getExpiryDate();

  return await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(key);
}

async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: [alg]
  });
  return payload;
}

export async function setSession({ id, email, role }: SessionType) {
  const expires = await getExpiryDate();
  const session = await encrypt({ id, email, role, expires });  
  const cookieSession = await cookies();

  cookieSession.set("AuthSession", session, {
    expires,
    sameSite: "strict",
    httpOnly: true,
    secure: true
  });
  return session;
}

export async function removeSession() {
  const cookieSession = await cookies();

  return cookieSession.delete('AuthSession');
}

export async function getSession() {
  const cookieSession = await cookies();
  const session = cookieSession.get("AuthSession")?.value;

  if (!session) return null;
  return await decrypt(session);
}

export async function getConsent() {
  const cookiesConsent = await cookies();
  const consent = cookiesConsent.get("CookiesConsent")?.value || false;

  return Boolean(consent);
}

export async function updateSession(request: NextRequest) {
  const cookieSession = await cookies();
  const session = cookieSession.get("AuthSession")?.value;
 
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = await getExpiryDate();
  
  const response = NextResponse.next();
  response.cookies.set({
    name: "AuthSession",
    value: await encrypt(parsed),
    expires: parsed.expires,
    sameSite: "strict",
    httpOnly: true,
    secure: true
  });
  return response;
}