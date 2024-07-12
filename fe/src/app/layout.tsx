import type { Metadata } from "next";
import { Londrina_Solid } from "next/font/google";
import "./globals.css";

import { Providers } from "@/lib/providers";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { DynamicProvider } from "@/lib/DynamicProvider";
import { Suspense } from "react";
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
  return (
    <html lang="en">
      <DynamicProvider>
        <Providers>
          <DynamicWagmiConnector>
            <Suspense>
              <body className={`${londrina.className} bg-white`}>
                {children}
              </body>
            </Suspense>
          </DynamicWagmiConnector>
        </Providers>
      </DynamicProvider>
    </html>
  );
}
