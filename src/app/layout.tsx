import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Lato, Roboto } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import id from "@/lib/id.json";
import en from "@/lib/en.json";

const translations = { id, en };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Persebaya ID",
  description: "Official website of Persebaya Surabaya",
  authors: [{ name: "FaiSal Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lato.className}>
      <LanguageProvider translations={translations}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
        >
          {children}
        </body>
      </LanguageProvider>
    </html>
  );
}
