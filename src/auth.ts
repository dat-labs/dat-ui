import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialsConfig = CredentialsProvider({
    name: "Credentials",
    credentials: {
        email: {
            label: "Email",
        },
        password: {
            label: "Password",
            type: "password",
        },
    },
    async authorize(credentials, request) {
        const res = await fetch(`${process.env.API_URL}/users/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        if (res.ok) {
            const resJson = await res.json();
            return resJson;
        }
        return null;
    },
});

const config = {
    providers: [credentialsConfig],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
