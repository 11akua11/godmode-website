import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GODMODE | Reset Protocol + Food of the Gods",
  description:
    "Enter the GODMODE Reset Bundle: the 7 Day Reset Protocol paired with Food of the Gods."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
