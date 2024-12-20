import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession, updateSession } from "@/actions/session";

export const config = {
  matcher: [
    "/",
    "/legal-notice/:path*",
    "/cookie-policy/:path*",
    "/sign-up/:path*",
    "/sign-in/:path*",
    "/my-competitions/:path*",
    "/settings/:path*"
  ]
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieAuth = await getSession();
  const authFilter = ["/sign-in", "/sign-up"];
  const unauthFilter = ["/my-competitions", "/settings"];

  cookieAuth && updateSession(request);

  if (cookieAuth && authFilter.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  else if (!cookieAuth && unauthFilter.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}