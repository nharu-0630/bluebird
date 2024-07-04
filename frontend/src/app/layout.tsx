import { Toaster } from "@/components/ui/toaster";
import WithApollo from "@/components/with-apollo";
import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bluebird App",
  description: "",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <WithApollo>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </WithApollo>
    </html>
  );
}
