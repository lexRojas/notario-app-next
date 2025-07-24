import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { ThemeInit } from "../.flowbite-react/init";
import "./globals.css";
import { geistMono, geistSans } from "@/fonts/fonts";



export const metadata: Metadata = {
  title: "Notario Tools",
  description: "Hecho por Rodrigo Rojas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
        <style>
          @import url(&quot;https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&family=Love+Ya+Like+A+Sister&family=Ms+Madi&family=Tauri&display=swap&quot;);
        </style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-blue-200 antialiased`}
      >
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}
