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
        const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/users/verify`, {
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
    trustHost: true,
    pages: {
        signIn: "/sign-in", 
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user?.id;
                token.workspace_id = user?.workspace_id;
                token.workspace_name = user?.workspace_name;
                token.organization_id = user?.organization_id;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.id;
                session.user.workspace_id = token.workspace_id;
                session.user.workspace_name = token.workspace_name;
                session.user.organization_id = token?.organization_id;
            }
            return session;
        },
        redirect: async ({ url, baseUrl }) => {
            return baseUrl + "/connections";
        },
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
