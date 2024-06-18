import React from "react";
import { signOut } from "next-auth/react";

/**
 * LogoutButton component renders a clickable element to log the user out.
 * When clicked, it triggers the sign-out process using NextAuth's signOut function.
 *
 * @returns {JSX.Element} The rendered LogoutButton component.
 */
export default function LogoutButton() {
    return (
        <div
            className="text-sm"
            onClick={() =>
                signOut({
                    callbackUrl: "/api/auth/signin",
                })
            }
        >
            Logout
        </div>
    );
}
