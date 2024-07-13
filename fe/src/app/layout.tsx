import type { Metadata } from "next";
import { Londrina_Solid } from "next/font/google";
import "./globals.css";

import { Suspense } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/config";

const londrina = Londrina_Solid({
  subsets: ["latin"],
  weight: ["400"],
});
export const metadata: Metadata = {
  title: "Luffy",
  description:
    "Fully private and decentralized fantasy sports solution. Own your squad. Own your prediction. ",
};

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
            <body className={`${londrina.className} bg-white`}>{children}</body>
          </Suspense>
        </QueryClientProvider>
      </WagmiProvider>
    </html>
  );
}
