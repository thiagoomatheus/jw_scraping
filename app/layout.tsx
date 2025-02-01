import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Rodape from "./componentes/rodape";
import Menu from "./componentes/menu";
import { ThemeProvider } from "@/components/ui/themeProvider";

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
      <body className={`${inter.className} bg-white dark:bg-gray-900 flex flex-col items-center gap-7 lg:gap-12 justify-start w-full`}>
        <Menu />
        <Toaster position="top-center" />
        <main className="w-full flex flex-col gap-10 items-center p-2 md:p-5 xl:p-8 min-h-[68vh]">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </main>
        <Rodape />
      </body>
    </html>
  );
}
