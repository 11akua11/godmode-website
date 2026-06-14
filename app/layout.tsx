import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GODMODE | 7 Day Reset Protocol",
  description:
    "A modern movement of discipline, alignment and transcendence. Enter the 7 Day Reset Protocol."
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
