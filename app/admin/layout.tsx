"use client";
import { adminMenu } from "@/constants";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

const { Header, Sider, Content } = Layout;

export default function RestaurantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
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

  const logOut = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    router.push("/login/admin");
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical flex items-center justify-center py-2">
          <img className="size-[50px] rounded-xl" src="/logo.png" />
        </div>

        <Menu
          mode="inline"
          selectedKeys={[currentPathname]}
          items={adminMenu.map((item) => ({
            icon: <item.icon />,
            label: (
              <Link prefetch={false} href={item.path}>
                {item.label}
              </Link>
            ),
            key: item.path,
          }))}
        />
        <div className="mt-auto absolute bottom-0 w-full p-3" onClick={logOut}>
          <div className="w-full hover:bg-red-200 duration-300 cursor-pointer text-red-600 flex items-center justify-center gap-2 rounded-md p-2 font-semibold">
            <FaSignOutAlt /> Đăng xuất
          </div>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background:
              "linear-gradient(109.6deg, rgb(255, 78, 80) 11.2%, rgb(249, 212, 35) 100.2%)",
            fontWeight: "bold",
            color: "white",
          }}
        >
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined className="!text-white !text-xl" />
              ) : (
                <MenuFoldOutlined className="!text-white !text-xl" />
              )
            }
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
