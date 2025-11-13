import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TanstackQueryProvider } from "@/components/providers/query-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const appUrl =
  process.env.APP_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 3000}`);

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    template: "%s  | Five Star Finance Inc.",
    default: "Stella | Five Star Finance Inc.",
  },
  description:
    "A Comprehensive Digital Solution for Streamlining Lending Processes for AFP Retirees and Beneficiaries at Five Star Finance Inc.",
  alternates: {
    canonical: "/",
  },

  openGraph: {
    url: "/",
    title: "Stella | Five Star Finance Inc.",
    description:
      "A Comprehensive Digital Solution for Streamlining Lending Processes for AFP Retirees and Beneficiaries at Five Star Finance Inc.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stella | Five Star Finance Inc.",
    description:
      "A Comprehensive Digital Solution for Streamlining Lending Processes for AFP Retirees and Beneficiaries at Five Star Finance Inc.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <TanstackQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
