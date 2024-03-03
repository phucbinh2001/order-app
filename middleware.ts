import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  let user;
  const pathname = request.nextUrl.pathname;
  const userJSON = request.cookies.get("user")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (userJSON) {
    try {
      user = JSON.parse(userJSON);
    } finally {
    }
  }

  //RESTAURANT
  if (pathname.includes("/restaurant")) {
    if (user?.role !== "ADMIN" || !accessToken) {
      return NextResponse.redirect(new URL("/login/restaurant", request.url));
    }
  }

  //CHEF
  if (pathname.includes("/chef")) {
    if (user?.role !== "CHEF" || !accessToken) {
      return NextResponse.redirect(new URL("/login/chef", request.url));
    }
  }
}

export const config = {
  matcher: ["/restaurant/:path*", "/chef/:path*"],
};
