"use client";
import Navbar from "@/components/Navbar";
import NextAuthProvider from "@/provider/nextProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <NextAuthProvider>
            <div>
              <Navbar />
            </div>
            <section className="grow">{children}</section>
          </NextAuthProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
