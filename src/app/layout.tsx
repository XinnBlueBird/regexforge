import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "RegexForge — Describe it. Forge it.",
  description: "Describe patterns in plain English. Get production-ready regex with explanations, test cases, and complexity analysis.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${mono.variable} font-mono antialiased min-h-screen bg-surface-0 text-foreground`}>
        {children}
      </body>
    </html>
  );
}
