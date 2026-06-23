import { FINGERPRINT_COOKIE_NAME } from "./constants";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
}

export function ensureFingerprint(): string {
  if (typeof document === "undefined") return "";
  const existing = readCookie(FINGERPRINT_COOKIE_NAME);
  if (existing) return existing;
  const fresh = crypto.randomUUID();
  writeCookie(FINGERPRINT_COOKIE_NAME, fresh);
  return fresh;
}
