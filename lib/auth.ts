import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getAuthConfigState } from "@/lib/auth-config";
import { logger } from "@/lib/logger";
import { createAdminClient } from "@/lib/supabase/admin";

const authConfig = getAuthConfigState();

if (!process.env.NEXTAUTH_URL && authConfig.baseUrl) {
  process.env.NEXTAUTH_URL = authConfig.baseUrl;
}

export function isGoogleAuthConfigured() {
  return authConfig.googleConfigured;
}

export function isGoogleSignInAvailable() {
  return authConfig.readyForGoogleSignIn;
}

export function getAuthConfigIssue() {
  if (!authConfig.googleConfigured) {
    return "Google sign-in is temporarily unavailable. Please contact support.";
  }

  if (!authConfig.secretConfigured || !authConfig.baseUrl) {
    return "Authentication is being configured. Please try again shortly.";
  }

  return null;
}

export function logAuthConfigWarnings() {
  if (!authConfig.baseUrl) {
    logger.error("Missing auth base URL. Set NEXTAUTH_URL (preferred) or APP_URL.");
  }

  if (!authConfig.secretConfigured) {
    logger.error("Missing NEXTAUTH_SECRET. Sessions may fail in production.");
  }

  if (!authConfig.googleConfigured) {
    logger.warn("Google OAuth provider is disabled due to missing AUTH_GOOGLE_ID/AUTH_GOOGLE_SECRET.");
  }
}

async function ensureProfile(email: string) {
  const admin = createAdminClient();
  const { error } = await admin.from("profiles").upsert(
    {
      id: email,
      email,
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
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && !isGoogleSignInAvailable()) {
        logger.error("Google sign-in attempted but auth configuration is incomplete", {
          hasBaseUrl: Boolean(authConfig.baseUrl),
          hasSecret: authConfig.secretConfigured,
          hasGoogleProvider: authConfig.googleConfigured,
        });
        return "/auth/error?error=ProviderUnavailable";
      }

      if (!user.email) {
        return "/auth/error?error=AccessDenied";
      }

      try {
        await ensureProfile(user.email);
      } catch (error) {
        logger.error("Failed to sync profile during sign-in", {
          email: user.email,
          error: error instanceof Error ? error.message : "Unknown error",
        });
        return "/auth/error?error=ProfileSync";
      }

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
