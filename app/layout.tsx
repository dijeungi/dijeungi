import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "BLOG", template: "%s | BLOG" },
  description: "웹 개발에 관한 생각과 기록.",
  applicationName: "BLOG",
  openGraph: {
    title: "BLOG",
    description: "웹 개발에 관한 생각과 기록.",
    type: "website",
    locale: "ko_KR",
  },
};

// 글 상세 공통 문서 구성
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
