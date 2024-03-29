import AppList from "@/components/AppList/AppList";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, ThemeConfig } from "antd";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Order Food",
  description: "Order Food App",
};

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#0077ff",
  },
};

export default function ChefLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider theme={theme}>
          <AntdRegistry>{children}</AntdRegistry>
          <AppList />
        </ConfigProvider>
      </body>
    </html>
  );
}
