import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Love Diary",
  description: "记录我们的美好瞬间",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen font-sans">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
