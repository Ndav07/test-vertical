import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { type Metadata } from "next";

import Providers from "./providers";
import { ThemeProvider } from "./_components/theme-provider";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "Sistema vertical",
  description: "Bem vindo ao sistema vertical",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
