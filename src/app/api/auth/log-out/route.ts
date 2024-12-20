import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { removeSession } from "@/actions/session";

export async function GET(request: NextRequest) {
  return logout();
}

export async function POST(request: NextRequest) {
  return logout();
}

async function logout() {
  await removeSession();
  
  return NextResponse.json({ logout: "success" }, { status: 200 });
}