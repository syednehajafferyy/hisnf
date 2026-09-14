import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "hisnf — Built with DevForge AI",
  description: "Generated full-stack application built with DevForge AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
