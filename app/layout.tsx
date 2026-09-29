import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "@/components/MenuContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Menu — Cardápios Digitais Profissionais e Inteligentes",
  description: "O Smart Menu transforma cardápios em experiências digitais modernas. Crie menus personalizados com QR Code, organize produtos de forma automática, personalize cores, fontes e layouts, e ofereça aos seus clientes uma navegação prática, bonita e profissional em qualquer dispositivo.",
  icons: "/logo-orance.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${inter.variable} ${dmSerifDisplay.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <MenuProvider>
          {children}
        </MenuProvider>
      </body>
    </html>
  );
}

