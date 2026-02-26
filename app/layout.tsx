import type { Metadata } from "next";
import { Archivo, Space_Grotesk, Noto_Serif_SC } from "next/font/google";
import { Toaster } from "sonner";
import { TypewriterSoundProvider } from "@/contexts/TypewriterSoundContext";
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

const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
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
    <html
      lang="zh-CN"
      className={`${archivo.variable} ${spaceGrotesk.variable} ${notoSerifSC.variable}`}
    >
      <body className="min-h-screen font-sans">
        <TypewriterSoundProvider>
          {children}
          <Toaster position="top-right" richColors />
        </TypewriterSoundProvider>
      </body>
    </html>
  );
}
