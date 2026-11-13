import { Google_Sans_Flex, Noto_Sans_KR } from "next/font/google";

import { siteName, siteDescription } from "@/lib/site";

import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

const googleSansFlex = Google_Sans_Flex({
  adjustFontFallback: false,
  weight: ["400", "500", "700"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-google-sans-flex",
});

const koreanSans = Noto_Sans_KR({
  weight: "variable",
  display: "swap",
  preload: false,
  variable: "--font-korean-sans",
});

export const metadata: Metadata = {
  title: { default: siteName, template: "%s | " + siteName },
  description: siteDescription,
  applicationName: siteName,
  openGraph: {
    title: siteName,
    description: siteDescription,
    type: "website",
    locale: "ko_KR",
  },
};

// 글 상세 공통 문서 구성
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={[googleSansFlex.variable, koreanSans.variable].join(" ")}>
      <body>{children}</body>
    </html>
  );
}
