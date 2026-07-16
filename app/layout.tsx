import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Rivera | Oceanic Portfolio",
  description: "A modern, immersive developer portfolio with an ocean-at-night atmosphere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
