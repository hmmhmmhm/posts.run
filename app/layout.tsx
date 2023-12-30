import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "새해인사 우체통",
  description: "신년인사 카드를 보내보세요!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
