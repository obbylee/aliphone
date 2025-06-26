import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aliphone - Your Ultimate Hub for Wholesale Mobile Devices",
  description:
    "Streamline your procurement process. Connect with verified suppliers and access the best bulk pricing on wholesale mobile devices, phones, and accessories. Fast & secure global shipping from Surabaya, Indonesia.", // Meta Description (150-160 characters)
  keywords: [
    "wholesale mobile devices",
    "bulk phones",
    "wholesale smartphones",
    "mobile phone suppliers",
    "bulk phone orders",
    "mobile accessories wholesale",
    "electronics wholesale",
    "iphone wholesale",
    "samsung wholesale",
    "xiaomi wholesale",
    "wholesale electronics Surabaya",
    "wholesale phones Indonesia",
    "B2B mobile phones",
    "Aliphone",
  ],
  alternates: {
    canonical: "https://www.aliphone.com/",
  },
  openGraph: {
    title: "Aliphone - Wholesale Mobile Devices & Bulk Phones",
    description:
      "Streamline your procurement process. Connect with verified suppliers and access the best bulk pricing on wholesale mobile devices, phones, and accessories. Global shipping from Aliphone.",
    url: "https://www.aliphone.com/",
    siteName: "Aliphone",
    images: [
      {
        url: "https://www.aliphone.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aliphone - Wholesale Mobile Devices & Bulk Phones",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aliphone - Wholesale Mobile Devices & Bulk Phones",
    description:
      "Streamline your procurement process. Connect with verified suppliers and access the best bulk pricing on wholesale mobile devices, phones, and accessories. Global shipping from Aliphone.",
    creator: "@aliphone_official",
    images: ["https://www.aliphone.com/images/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
