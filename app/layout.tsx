import { TanstackQueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { DialogProvider } from "@/contexts/DialogContext";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
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
          <DialogProvider>
            <AuthProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <Toaster />
                {children}
              </ThemeProvider>
            </AuthProvider>
          </DialogProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
