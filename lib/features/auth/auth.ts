import { compare } from "bcrypt-ts";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getUserByEmail } from "../../../app/(auth)/queries";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize({ email, password }) {
        const user = await getUserByEmail(email);

        const passwordsMatch = await compare(password, user.passwordHash!);

        if (!passwordsMatch) {
          return null;
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //     }

  //     return token;
  //   },
  //   async session({
  //     session,
  //     token,
  //   }: {
  //     session: ExtendedSession;
  //     token: any;
  //   }) {
  //     if (session.user) {
  //       session.user.id = token.id as string;
  //     }

  //     return session;
  //   },
  // },
});
