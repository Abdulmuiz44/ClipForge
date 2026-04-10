const trim = (value?: string | null) => value?.trim() ?? "";

export function resolveAuthBaseUrl(rawNextAuthUrl?: string | null, rawAppUrl?: string | null) {
  const nextAuthUrl = trim(rawNextAuthUrl);
  const appUrl = trim(rawAppUrl);
  return nextAuthUrl || appUrl || null;
}

export function isGoogleAuthConfiguredFromEnv(rawGoogleId?: string | null, rawGoogleSecret?: string | null) {
  return Boolean(trim(rawGoogleId) && trim(rawGoogleSecret));
}

export function isAuthSecretConfigured(rawSecret?: string | null) {
  return Boolean(trim(rawSecret));
}

export function getAuthConfigState() {
  const baseUrl = resolveAuthBaseUrl(process.env.NEXTAUTH_URL, process.env.APP_URL);
  const googleConfigured = isGoogleAuthConfiguredFromEnv(process.env.AUTH_GOOGLE_ID, process.env.AUTH_GOOGLE_SECRET);
  const secretConfigured = isAuthSecretConfigured(process.env.NEXTAUTH_SECRET);

  return {
    baseUrl,
    googleConfigured,
    secretConfigured,
    readyForGoogleSignIn: Boolean(baseUrl && googleConfigured && secretConfigured),
  };
}
