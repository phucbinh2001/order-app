"use client";
import OrderDetail from "@/components/OrderDetail/OrderDetail";
import OrderList from "@/components/OrderList/OrderList";
import useOrderStore from "@/store/orderStore";
import { OrderStatusEnum } from "@/types/order";
import { QueryParam } from "@/types/query";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { socket } from "@/utils/socket";
import OrderDetailDrawer from "@/components/OrderDetail/OrderDetailDrawer";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState<QueryParam>({
    status: OrderStatusEnum.pending,
  });
  const { orders, loadingOrders } = useOrderStore((state) => state);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);

  useEffect(() => {
    fetchOrders(query);
  }, [query]);

  const refreshData = () => {
    fetchOrders(query, true);
  };

  useEffect(() => {
    socket.on("new-order", refreshData);

    return () => {
      socket.off("new-order", refreshData);
    };
  }, [query]);

  const debounceSearch = useCallback(
    debounce((search) => {
      setQuery({ ...query, search });
    }, 300),
    []
  );

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    router.push("/login/chef");
  };

  return (
    <div className="grid grid-cols-12 h-svh">
      <div className="xl:col-span-9 col-span-12">
        <div className="wrapper bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-700 h-full rounded-r-3xl p-5">
          <div className="header flex gap-2 items-center">
            <img width={150} src="/icons/chef-hat.png" alt="" />
            <div className="text-white">
              <h2 className="font-bold text-xl mb-2 flex">
                Xin chào!{" "}
                <div
                  onClick={handleLogout}
                  className="flex items-center text-yellow-500 text-base ml-3 gap-1 cursor-pointer group font-normal hover:bg-yellow-200 hover:text-yellow-900 duration-300 rounded-md px-3"
                >
                  <FaSignOutAlt /> <span>Đăng xuất</span>
                </div>
              </h2>
              <p className="text-3xl font-light">
                Có <b className="font-bold">{orders.length} đơn hàng</b> chờ bạn
                chuẩn bị
              </p>
            </div>

            <div className="ml-auto">
              <Input
                suffix={loadingOrders && <Spin />}
                prefix={
                  <SearchOutlined className="!text-[#383799] text-2xl ml-auto cursor-pointer mr-2" />
                }
                placeholder="Tìm kiếm theo mã đơn"
                style={{ width: 300 }}
                className="ml-auto"
                // variant="outlined"
                size="large"
                onChange={(e) => debounceSearch(e.target.value)}
              />
            </div>
          </div>
          <OrderList />
        </div>
      </div>

      <div className="xl:col-span-3 xl:block hidden px-2">
        <OrderDetail />
      </div>
      <OrderDetailDrawer />
    </div>
  );
}
