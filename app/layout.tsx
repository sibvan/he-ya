import type { Metadata } from "next";
import { Unbounded, Noto_Sans } from "next/font/google";
import "./globals.css";

import LocalStorageProvider from "@/components/providers/LocalStorageProvider";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ButtonScrollToTop from "@/components/ui/ButtonScrollToTop";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "he▶︎ya",
  description: "Учитесь эффективно по плейлистам YouTube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${notoSans.variable} ${unbounded.variable} antialiased`}
      >
        <div className="mx-auto flex min-h-dvh max-w-[1536px] min-w-[320px] flex-col bg-[url(/bg.webp)] bg-contain bg-top bg-no-repeat px-3 py-6 dark:bg-[url(/bg-dark.webp)]">
          <Header />
          <div className="content-gap flex-1 pt-[calc(200px/3*1)] pb-[calc(300px/3*1)] md:pt-[calc(200px/3*2)] md:pb-[calc(300px/3*2)] xl:pt-[calc(200px/3*3)] xl:pb-[calc(300px/3*3)]">
            <LocalStorageProvider />
            {children}
          </div>
          <ButtonScrollToTop />
          <Footer />
        </div>
      </body>
    </html>
  );
}
