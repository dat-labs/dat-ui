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
        // const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/users/verify`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        // });
        // if (res.ok) {
        //     const resJson = await res.json();
        //     console.log(resJson);
        //     return resJson;
        // }
        // return null;

        const res = {
            created_at: "2024-03-19T18:11:21.886584",
            id: "09922bd9-7872-4664-99d0-08eae42fb554",
            email: "user@dat.com",
            password_hash: "$2a$10$9QnKOPnMgGTrxtwc/A2jW.dG8RAW13QFuTe7CsOKrNNVew6kiIVtO",
            updated_at: "2024-06-13T13:06:23.855231",
            workspace_id: "wkspc-uuid",
        };

        return res;
    },
});

const config = {
    providers: [credentialsConfig],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user?.id;
                token.workspace_id = user?.workspace_id;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.id;
                session.user.workspace_id = token.workspace_id;
            }
            return session;
        },
        redirect: async ({ url, baseUrl }) => {
            return baseUrl + "/connections";
        },
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
