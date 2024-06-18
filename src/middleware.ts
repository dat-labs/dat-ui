import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// const protectedRoutes = ["/"];
const protectedRoutes = ["connections", "actors", "help", "settings"];

import { auth } from "./auth";

/**
 * Middleware function to handle authentication for protected routes.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse|undefined>} The response object if redirection is needed, or undefined.
 */
export default async function middlware(request: NextRequest) {
    const session = await auth();
    //     const isProtectedRoute = protectedRoutes.some((prefix) => request.nextUrl.pathname === prefix);
    const isProtectedRoute = protectedRoutes.some((prefix) => request.nextUrl.pathname.includes(prefix));

    if (!session && isProtectedRoute) {
        const absoluteURL = new URL("/api/auth/signin", request.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
}
