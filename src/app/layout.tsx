import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "./providers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Animus",
  description: "A day-to-day event tracker for anticipatory anxiety",
  metadataBase: new URL("https://animus.itzami.com/"),
  openGraph: {
    title: "Animus",
    description: "A day-to-day event tracker for anticipatory anxiety",
  },
  twitter: {
    card: "summary_large_image",
    title: "Animus",
    description: "A day-to-day event tracker for anticipatory anxiety",
    creator: "@HeyItzaMi",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        src="https://eu.umami.is/script.js"
        data-website-id="44a597b5-904c-44b6-92b8-83930e8c1762"
      />
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
