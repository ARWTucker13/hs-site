import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Health System Control Knobs",
  description: "Interactive health system financing scenarios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="mx-auto max-w-6xl px-3 py-4 sm:px-6 sm:py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
