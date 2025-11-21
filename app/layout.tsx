import { Providers } from "@/components/Providers";
import "./globals.css";
import { ReactNode } from "react";
import { Header } from "../components/ui/Header";

export const metadata = {
  title: "WellChild Services",
  description: "Healthcare services platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Providers>
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
