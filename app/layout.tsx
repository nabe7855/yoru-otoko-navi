import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "夜漢ナビ (Yakan Navi) | 男性ナイトワーク求人サイト",
  description:
    "男性向けナイトワーク求人プラットフォーム。黒服、ボーイ、店長候補など、高収入・好待遇の求人を多数掲載。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className="antialiased bg-slate-50">
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pb-16 md:pb-0">{children}</main>
            <Footer />
            <MobileNav />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
