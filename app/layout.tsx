import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "我的旅行",
  description:
    "專屬旅遊行程、住宿、美食、公佈欄、投票與旅行紀錄工具。",
  openGraph: {
    title: "我的旅行",
    description:
      "專屬旅遊行程、住宿、美食、公佈欄、投票與旅行紀錄工具。",
    siteName: "我的旅行",
    type: "website",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "我的旅行",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "我的旅行",
    description:
      "專屬旅遊行程、住宿、美食、公佈欄、投票與旅行紀錄工具。",
    images: ["/icon-512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${notoSansTC.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
