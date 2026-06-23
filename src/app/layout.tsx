import type { Metadata } from "next";
import "./globals.css";
import { FingerprintBootstrap } from "@/components/FingerprintBootstrap";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://whatsinmycart.app";
const SITE_NAME = "왓츠인마이카트";
const DESCRIPTION =
  "쇼핑몰 장바구니 링크만 붙여넣으면 예쁜 픽셀 카드로! 갖고 싶은 걸 한 곳에 모아 친구에게 공유하고 자랑해보세요. 🛒💖";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — 내 장바구니를 카드로 공유`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "장바구니 공유",
    "위시리스트",
    "쇼핑 위시리스트",
    "장바구니 카드",
    "선물 공유",
    "왓츠인마이카트",
    "cart share",
    "wishlist",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — 내 장바구니를 카드로 공유`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — 내 장바구니를 카드로 공유`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">
        <FingerprintBootstrap />
        {children}
      </body>
    </html>
  );
}
