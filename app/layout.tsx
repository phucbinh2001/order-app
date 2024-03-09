import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { ConfigProvider, ThemeConfig } from "antd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Order Food",
  description: "Order Food App",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [{ name: "Phúc Bình" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-192x192.png" },
    { rel: "icon", url: "icons/icon-192x192.png" },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#ff7819",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider theme={theme}>
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
