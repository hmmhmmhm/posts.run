import "./globals.css";
import type { Metadata, Viewport } from "next";
import { ClientProvider } from "@/components/ClientProvider";

export const viewport: Viewport = {
  themeColor: "black",
  viewportFit: "cover",
  width: "400",
};

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
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
