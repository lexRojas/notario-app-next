import { ThemeModeScript, ThemeProvider } from "flowbite-react";
import type { Metadata } from "next";
import { geistMono, geistSans } from "@/fonts/fonts";
import { MenuPrincipal } from "@/components/Menu";
import "@/styles/globals.css";




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
        

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-blue-200 antialiased`}
      >
        <header>
          <MenuPrincipal />
        </header>
        
          {children}
        



      </body>
    </html>
  );
}
