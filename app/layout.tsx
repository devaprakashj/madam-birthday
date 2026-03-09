import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday Madam 🎂",
  description: "A special birthday surprise — just for you.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#0a0a1a", overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
