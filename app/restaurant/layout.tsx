"use client";
import { adminMenu } from "@/constants";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

const { Header, Sider, Content } = Layout;

export default function RestaurantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const navigateRouter = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const currentPathname = useMemo(() => pathname.split("/")[2], [pathname]);
  const currentPageName = useMemo(
    () => adminMenu.find((item) => item.path == currentPathname)?.label,
    [currentPathname]
  );

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical flex items-center justify-center py-2">
          <img className="size-[40px]" src="/logo.png" />
        </div>

        <Menu
          mode="inline"
          selectedKeys={[currentPathname]}
          items={adminMenu.map((item) => ({
            icon: <item.icon />,
            label: item.label,
            onClick: () => navigateRouter.push(item.path),
            key: item.path,
          }))}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <span>{currentPageName}</span>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            maxHeight: "100vh",
            overflowY: "auto",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
