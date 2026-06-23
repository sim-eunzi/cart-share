import type { Metadata } from "next";
import "./globals.css";
import { FingerprintBootstrap } from "@/components/FingerprintBootstrap";

export const metadata: Metadata = {
  title: "왓츠인마이카트",
  description: "쇼핑몰 장바구니를 카드로 만들어 친구에게 공유하는 핑크 픽셀 키치 웹",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
