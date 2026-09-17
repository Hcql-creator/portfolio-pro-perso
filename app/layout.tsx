import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sourceSerif4Variable = localFont({
  src: [
    {
      path: "./fonts/source-serif-4/SourceSerif4Variable-Italic.ttf.woff2",
      weight: "200 900",
      style: "italic",
    },
    {
      path: "./fonts/source-serif-4/SourceSerif4Variable-Roman.ttf.woff2",
      weight: "200 900",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rafaël HOCQUEL - Portfolio",
  description:
    "Porfolio professionnel & personnel de Rafaël HOCQUEL - Présentation & Contat, Projets universitaires & personnels, Expériences, Compétences et bien plus...",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${sourceSerif4Variable.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
