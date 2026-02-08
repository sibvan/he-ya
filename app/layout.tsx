import type { Metadata } from "next";
import { Noto_Sans, Unbounded } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PlaylistsStoreInitializer from "@/components/store/PlaylistsStoreInitializer";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "he▶ya",
  description: "Учитесь эффективно по плейлистам YouTube",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${unbounded.variable} antialiased`}
      >
        <PlaylistsStoreInitializer />

        <div className="mx-auto flex min-h-[100dvh] max-w-[1536px] min-w-[393px] flex-col px-3 py-6">
          <Header />
          <div className="mt-[calc(200px/3)] mb-[calc(300px/3)] flex flex-col gap-[calc(100px/3)] md:mt-[calc(200px/3*2)] md:mb-[calc(300px/3*2)] md:gap-[calc(100px/3*2)] xl:mt-[200px] xl:mb-[300px] xl:gap-[100px]">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
