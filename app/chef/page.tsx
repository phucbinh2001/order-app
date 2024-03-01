"use client";
import OrderDetail from "@/components/OrderDetail/OrderDetail";
import OrderList from "@/components/OrderList/OrderList";
import useOrderStore from "@/store/orderStore";
import { OrderStatusEnum } from "@/types/order";
import { QueryParam } from "@/types/query";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState<QueryParam>({
    status: OrderStatusEnum.pending,
  });
  const orders = useOrderStore((state) => state.orders);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);

  useEffect(() => {
    fetchOrders(query);
  }, [query]);

  const debounceSearch = useCallback(
    debounce((search) => {
      setQuery({ ...query, search });
    }, 300),
    []
  );

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-9 p-3">
        <div className="wrapper bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-700 h-full rounded-3xl p-5">
          <div className="header flex gap-2 items-center">
            <img width={150} src="/icons/chef-hat.png" alt="" />
            <div className="text-white">
              <h2 className="font-bold text-xl mb-2">Chào, Bình!</h2>
              <p className="text-3xl font-light">
                Có <b className="font-bold">{orders.length} đơn hàng</b> chờ bạn
                chuẩn bị
              </p>
            </div>

            <div className="ml-auto">
              <Input
                prefix={
                  <SearchOutlined
                    onClick={() => ""}
                    className="!text-[#383799] text-2xl ml-auto cursor-pointer mr-2"
                  />
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
          <OrderList orders={orders} />
        </div>
      </div>

      <div className="col-span-3">
        <OrderDetail />
      </div>
    </div>
  );
}
