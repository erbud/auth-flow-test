import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { UserType, VerifyEmailType } from "@/lib/definitions";
import { getUser, updateVerified } from "@/actions/users";

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email') ?? "";
  const code = searchParams.get('code') ?? "";

  return verifyEmail({ email, code });
}

export async function POST(request: NextRequest) {
  const searchParams: VerifyEmailType = await request.json();
  const { email, code } = {...searchParams};

  return verifyEmail({ email, code });
}

async function verifyEmail({ email, code }: VerifyEmailType) {
  let codeStatus = "500";
  const user: UserType | null = await getUser(email);
  const uri = new URL("/verify-email", process.env.APP_DOMAIN);

  if (!user) {
    codeStatus = "401";
  }
  else if (user?.verified)  {
    codeStatus = "403";
  }
  else if (user?.id !== code) {
    codeStatus = "404";
  }
  else {
    codeStatus = "200";
    await updateVerified(email);
  }
  uri.searchParams.set('codeStatus', codeStatus);

  return NextResponse.redirect(uri);
}