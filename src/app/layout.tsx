import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RideNEarn — Turn Every Vehicle Into a Moving Billboard",
  description:
    "India's first mobile OOH advertising platform. Brands get unmatched visibility, riders earn passive income. Join the transit advertising revolution.",
  keywords: ["transit advertising", "mobile OOH", "rider earnings", "brand visibility", "Delhi NCR"],
  openGraph: {
    title: "RideNEarn — Your Brand. In Motion.",
    description: "Turn delivery vehicles into moving billboards. Reach millions of eyeballs across the city.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-screen bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}
