import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RootLayoutType } from "@/lib/definitions";
import { Providers } from "@/components/providers";
import CookiesConsent from "@/components/cookies/CookiesConsent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "deCompeti",
  description: "Generador y gestor de calendarios deportivos para competiciones de eSports",
};

export default async function RootLayout({ children, modal }: RootLayoutType) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="container layout sm:mx-auto">
          <Providers>
            <Header />
            <main className="mt-20">
              {
                children
              }
            </main>
          </Providers>
          <Footer />
        </div>
        <CookiesConsent />
      </body>
    </html>
  );
}
