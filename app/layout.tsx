import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Stella | Five Star System",
  description:
    "A Comprehensive Digital Solution for Streamlining Lending Processes for AFP Retirees and Beneficiaries at Five Star Finance Inc.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "Stella | Five Star System",
    description:
      "A Comprehensive Digital Solution for Streamlining Lending Processes for AFP Retirees and Beneficiaries at Five Star Finance Inc.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Stella | Five Star System",
    description:
      "A Comprehensive Digital Solution for Streamlining Lending Processes for AFP Retirees and Beneficiaries at Five Star Finance Inc."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
