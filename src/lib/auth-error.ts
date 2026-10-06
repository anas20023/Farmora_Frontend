/** Turns authentication provider errors into clear, safe messages for users. */
export function getAuthErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error ?? "");
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid email") || normalized.includes("invalid password") || normalized.includes("credentials")) {
    return "The email address or password is incorrect.";
  }
  if (normalized.includes("already exists") || normalized.includes("already in use") || normalized.includes("user already")) {
    return "An account already exists for this email address. Try signing in instead.";
  }
  if (normalized.includes("email not verified")) {
    return "Please verify your email address before signing in. Check your inbox for the verification link.";
  }
  if (normalized.includes("network") || normalized.includes("fetch")) {
    return "We couldn’t reach Farmora. Check your connection and try again.";
  }

  return "We couldn’t complete that request. Please try again.";
}
