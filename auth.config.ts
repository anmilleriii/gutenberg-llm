import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

export default {
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.AUTH_RESEND_EMAIL,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // TODO middleware
    authorized: async ({ auth }) => {
      return !!auth;
    },
    // jwt: async ({ token, user, account }) => {
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   console.log({ user, token, account });
    //   return token;
    // },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  debug: false,
} satisfies NextAuthConfig;
