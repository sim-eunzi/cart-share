import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "What's in my cart?",
  description: "쇼핑몰 장바구니를 카드로 만들어 친구에게 공유하는 핑크 픽셀 키치 웹",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
