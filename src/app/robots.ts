import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://whatsinmycart.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/create"],
      // 토큰이 포함된 개인 카트 URL은 크롤링 금지
      disallow: ["/c/", "/e/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
