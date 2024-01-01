import "./globals.css";
import type { Metadata, Viewport } from "next";
import { ClientProvider } from "@/components/ClientProvider";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "새해인사 우체통",
  description: "신년인사 카드를 보내보세요!",
  metadataBase: new URL("https://posts.run"),
  authors: [
    {
      name: "hmmhmmhm",
      url: "https://twitter.com/hmmhmmhm",
    },
  ],
  abstract: "신년인사 카드를 보내보세요!",
  keywords: ["새해인사", "우체통", "신년인사", "신년카드", "새해카드", "새해"],
  openGraph: {
    title: "새해인사 우체통",
    description: "신년인사 카드를 보내보세요!",
    locale: "ko_KR",
    type: "website",
    siteName: "새해인사 우체통",
    images: [
      {
        url: "https://posts.run/og.png",
        width: 1200,
        height: 630,
        alt: "새해인사 우체통",
      },
    ],
  },
  twitter: {
    title: "새해인사 우체통",
    description: "신년인사 카드를 보내보세요!",
    card: "app",
  },
  applicationName: "새해인사 우체통",
  robots: "index,follow",
  referrer: "origin",
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
        <Analytics />
      </body>
    </html>
  );
}
