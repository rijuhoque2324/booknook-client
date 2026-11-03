import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const response = NextResponse.redirect(
      new URL("/login", request.url)
    );

    response.cookies.set("auth-required", "1", {
      path: "/",
      maxAge: 30,
      sameSite: "lax",
      httpOnly: false,
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-book/:path*",
    "/my-books/:path*",
    "/my-borrows/:path*",
    "/books/:id",
  ],
};