import { Geist, Geist_Mono, Goldman } from "next/font/google";

export const handWrite = Goldman({
  style: "normal",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
