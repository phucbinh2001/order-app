import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;

  try {
    const { data } = await (
      await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/profile", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
    ).json();

    //RESTAURANT
    if (pathname.includes("/admin")) {
      if (data?.role !== "ADMIN" || !accessToken) {
        throw new Error("Vui lòng đăng nhập");
      }
    }

    //CHEF
    if (pathname.includes("/chef")) {
      if (data?.role !== "CHEF" || !accessToken) {
        throw new Error("Vui lòng đăng nhập");
      }
    }
  } catch (error) {
    if (pathname.includes("/admin")) {
      return NextResponse.redirect(new URL("/login/admin", request.url));
    }
    if (pathname.includes("/chef")) {
      return NextResponse.redirect(new URL("/login/chef", request.url));
    }
  }
}

export const config = {
  matcher: ["/admin/:path*", "/chef/:path*"],
};
