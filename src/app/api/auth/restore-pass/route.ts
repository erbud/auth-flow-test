import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { RestorePassType } from "@/lib/definitions";

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email') ?? "";
  const code = searchParams.get('code') ?? "";

  return restorePass({ email, code });
}

export async function POST(request: NextRequest) {
  const searchParams: RestorePassType = await request.json();
  const { email, code } = {...searchParams};

  return restorePass({ email, code });
}

async function restorePass({ email, code }: RestorePassType) {
  const uri = new URL("/restore-pass", process.env.APP_DOMAIN);

  uri.searchParams.set('email', email);
  uri.searchParams.set('code', code);

  return NextResponse.redirect(uri);
}