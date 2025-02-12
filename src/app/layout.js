import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '..//lib/AwesomeFonts'
import StickyHeader from "@/components/StickyHeader/StickyHeader";
import UserId from "@/components/UserID/UserId";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "YakzhCafe",
  description: "Created by YakzhNikolas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserId/>
        <StickyHeader></StickyHeader>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
