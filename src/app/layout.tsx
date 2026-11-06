import type { Metadata } from "next";
import "./globals.css";
import "./ghosty.css";

export const metadata: Metadata = {
  title: "Ghosty: go ghost on any app",
  description:
    "Privacy wherever you are. Ghosty pays any app from your shielded balance through a private account. No new network, no new wallet.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@700;800&family=Chakra+Petch:wght@600;700&family=Oxanium:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap"
        />
        <link rel="icon" href="/ghosty/ghost.png" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
