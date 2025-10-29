import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Trend Dashboard",
  description: "AI-powered insight platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} 
          bg-gray-50 text-gray-900 antialiased
          min-h-screen
          flex flex-col
        `}
      >
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          {children}
        </main>

        <footer className="bg-white shadow-inner py-4 px-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Sandy Lee. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
