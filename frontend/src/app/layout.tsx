import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "English Learning Platform",
  description: "Master English Today",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-[#0B1220] text-white min-h-screen">{children}</body>
    </html>
  );
}
