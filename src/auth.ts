import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";

const pool = new Pool({
    host: "localhost",
    user: "root",
    password: "root",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

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
    adapter: PostgresAdapter(pool),
    providers: [credentialsConfig],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
