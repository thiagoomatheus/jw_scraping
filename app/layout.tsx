import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Designações",
  description: "Designações para reunião Nossa Vida e Minitério",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} flex flex-col items-center justify-start m-5`}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
