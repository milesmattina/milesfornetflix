import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://milesfornetflix.vercel.app"),
  icons: { icon: "/favicon.svg" },
  title: {
    default: "Miles Mattina for Netflix",
    template: "%s | Miles Mattina for Netflix",
  },
  description:
    "A custom interactive application for the Manager, UCAN Marketing – Live Title Creative role at Netflix.",
  twitter: { card: "summary_large_image", images: ["/social-preview.png"] },
  openGraph: {
    title: "Miles Mattina for Netflix",
    description:
      "A custom interactive application for the Manager, UCAN Marketing – Live Title Creative role at Netflix.",
    type: "website",
    images: [{ url: "/social-preview.png", width: 1200, height: 630, alt: "Miles Mattina — an independent application for Netflix" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.variable} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
