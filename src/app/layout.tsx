
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

import MainLayout from "@/components/layout/MainLayout";
import ToastProvider from "@/components/providers/ToastProvider";


export const metadata: Metadata = {
  title: {
    default: "BookNook | Online Library",
    template: "BookNook | %s",
  },
  description:
    "Explore books, discover new authors, and borrow your favorite books with BookNook.",
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <MainLayout>          
          {children}
        </MainLayout>
        <ToastProvider/>
      </body>
    </html>
  );
}
