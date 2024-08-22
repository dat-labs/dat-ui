import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// const protectedRoutes = ["/"];
const protectedRoutes = ["connections", "actors", "help", "settings"];

import { auth } from "./auth";

export const getUsersData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/users/list`);
    const data = await response.json();
    return { data, status: response.status };
};

/**
 * Middleware function to handle authentication for protected routes.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse|undefined>} The response object if redirection is needed, or undefined.
 */
export default async function middlware(request: NextRequest) {
    const session = await auth();
    const isProtectedRoute = protectedRoutes.some((prefix) => request.nextUrl.pathname.includes(prefix));

    const users = await getUsersData();

    // const users = [
    //     {
    //         id: "09922bd9-7872-4664-99d0-08eae42fb554",
    //         created_at: "2024-03-19T18:11:21.886584",
    //         updated_at: "2024-06-13T13:06:23.855231",
    //         email: "user@dat.com",
    //         password_hash: "$2a$10$9QnKOPnMgGTrxtwc/A2jW.dG8RAW13QFuTe7CsOKrNNVew6kiIVtO",
    //     },
    // ];
    // const users = [];
    // const currentPath = request.nextUrl.pathname; // Get the current request path

    // if (users.length != 0 && currentPath !== "/sign-up") {
    //     const absoluteURL = new URL("/sign-up", request.nextUrl.origin);
    //     return NextResponse.redirect(absoluteURL.toString());
    // }
    if (!session && isProtectedRoute) {
        const absoluteURL = new URL("/api/auth/signin", request.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
}
