import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Verify with credentials
        // DOCS: https://next-auth.js.org/configuration/providers/credentials
        const mockedUser = { id: "33", name: "Jonh", password: "nextauth" };
        if (
          credentials?.username === mockedUser.name &&
          credentials?.password === mockedUser.password
        ) {
          return mockedUser;
        } else {
          return null;
        }
      },

      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your password",
        },
      },
    }),
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRETS as string,
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRETS as string,
    }),
  ],
};