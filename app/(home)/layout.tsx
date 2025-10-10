import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { ThemeInit } from "../../.flowbite-react/init"
import "@/app/globals.css";
import { geistMono, geistSans } from "@/fonts/fonts";
import { MenuPrincipal } from "@/components/Menu";



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
    <html lang="es" suppressHydrationWarning>
      <head>
        <ThemeModeScript mode="light" />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-blue-200 antialiased`}
      >
        <ThemeInit />
        <header>
          <MenuPrincipal />
        </header>
        {children}


      </body>
    </html>
  );
}
