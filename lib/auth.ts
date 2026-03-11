import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createAdminClient } from "@/lib/supabase/admin";

export function isGoogleAuthConfigured() {
  return Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
}

async function ensureProfile(email: string) {
  const admin = createAdminClient();
  const { error } = await admin.from("profiles").upsert(
    {
      id: email,
      email,
      trial_credits_granted: 100,
      trial_credits_consumed: 0,
      trial_credits_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      onConflict: "id",
      ignoreDuplicates: true,
    },
  );

  if (error) {
    throw new Error(error.message);
  }
}

export const authOptions: NextAuthOptions = {
  providers: isGoogleAuthConfigured()
    ? [
        GoogleProvider({
          clientId: process.env.AUTH_GOOGLE_ID!,
          clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
      ]
    : [],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      await ensureProfile(user.email);
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        token.userId = user.email;
      }

      if (!token.userId && token.email) {
        token.userId = token.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = String(token.userId);
      }

      return session;
    },
  },
};
