import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "Faultline Studio",
  description: "Painel de Controle para o Canal Faultline Economics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <header className="bg-[var(--panel)]">
          <nav className="max-w-6xl mx-auto flex items-center justify-end gap-4 px-6 py-4">
            <a href="/_check" className="text-sm hover:underline">
              Check
            </a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}