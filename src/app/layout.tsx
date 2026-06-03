import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../styles/globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", 
});

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins", 
});

export const metadata: Metadata = {
  title: "Catálogo de Filmes",
  description: "Interface TMDB com Next.js e Tailwind v4",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {/* Envolvemos os filhos com o Provider */}
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </body>
    </html>
  );
}