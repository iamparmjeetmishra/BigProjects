import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: 'swap'  });
const poppins = Poppins({ subsets: ["latin"], display: 'swap', weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });



import "./globals.css";
import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";



export const metadata: Metadata = {
  title: "App Title",
  description: "App Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>"
      />

      <body
        className={`${inter.className} ${poppins.className} h-screen w-screen antialiased`}
      >
        <QueryProvider>
          {children}
          <Toaster position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
