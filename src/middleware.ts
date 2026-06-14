import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow unauthenticated access to the login page itself
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // 2. Retrieve the admin_session cookie
  const adminSession = request.cookies.get("admin_session");

  // 3. Redirect to login if cookie is missing or invalid
  if (!adminSession || adminSession.value !== "true") {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 4. Configure matcher to apply only to admin page paths
export const config = {
  matcher: [
    "/admin/:path*",
  ],
};