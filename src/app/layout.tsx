import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "./providers";

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
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
