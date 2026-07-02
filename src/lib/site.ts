export const SITE_TITLE = "ithkeen 的博客";
export const SITE_DESCRIPTION = "记录技术、写作和日常思考。";
export const SITE_URL = "https://ithkeen.github.io";

const rawBase = import.meta.env.BASE_URL || "/";
const normalizedBase = rawBase === "/" ? "" : rawBase.replace(/\/$/, "");

export function withBase(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (cleanPath === "/") {
    return normalizedBase ? `${normalizedBase}/` : "/";
  }

  return `${normalizedBase}${cleanPath}`;
}

export function absoluteUrl(path = "/") {
  return new URL(withBase(path), SITE_URL).toString();
}

export function tagSlug(tag: string) {
  return encodeURIComponent(tag.trim());
}
