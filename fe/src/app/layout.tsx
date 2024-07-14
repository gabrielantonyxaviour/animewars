"use client";
import type { Metadata } from "next";
import { Londrina_Solid } from "next/font/google";
import "./globals.css";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/config";
import { Suspense } from "react";

const londrina = Londrina_Solid({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Suspense>
            <body
              className={`${londrina.className} bg-no-repeat bg-cover `}
              style={{
                backgroundImage: `url(/overall.gif)`,
              }}
            >
              {children}
            </body>
          </Suspense>
        </QueryClientProvider>
      </WagmiProvider>
    </html>
  );
}
