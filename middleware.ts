import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth);
    if (
      req.nextUrl.pathname === "/add" &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("You are not authorized!");
    }
    if (
      req.nextUrl.pathname === "/cart" &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("You are not authorized!");
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/admin-dashboard", "/profile-page"] };
