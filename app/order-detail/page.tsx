"use client";

import { orderApi } from "@/api/order.api";
import AppLoading from "@/components/AppLoading/AppLoading";
import OrderHistoryItem from "@/components/OrderHistoryItem/OrderHistoryItem";
import { socketAction } from "@/constants";
import useOrderStore from "@/store/orderStore";
import { Order } from "@/types/order";
import { socket } from "@/utils/socket";
import { Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

export default function OrderDetailPage() {
  const sessionKey = useOrderStore((state) => state.order.sessionKey);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [orderDetailData, setOrderDetailData] = useState<Order[]>([]);

  const fetchOrders = async (showLoading = true) => {
    if (!sessionKey) return;
    try {
      if (showLoading) {
        setLoading(true);
      }
      const { data } = await orderApi.getOrdersBySessionKey(sessionKey || "");
      setOrderDetailData(data);
      joinOrderRoom(data);
    } finally {
      setLoading(false);
    }
  };

  //Join room để nhận thông tin trạng thái đơn hàng realtime
  const joinOrderRoom = (data: Order[]) => {
    if (!data.length) return;
    socket.emit(socketAction.JOIN, sessionKey);
  };

  useEffect(() => {
    fetchOrders();
  }, [sessionKey]);

  useEffect(() => {
    socket.on(socketAction.UPDATE_ORDER_STATUS, () => fetchOrders(false));

    return () => {
      socket.off(socketAction.UPDATE_ORDER_STATUS, fetchOrders);
      socket.emit(socketAction.LEAVE, sessionKey);
    };
  }, [sessionKey]);

  if (loading) return <AppLoading />;
  return (
    <div
      style={{
        background:
          "linear-gradient(109.6deg, rgb(255, 78, 80) 11.2%, rgb(249, 212, 35) 100.2%)",
      }}
    >
      <div className="max-w-[500px] mx-auto min-h-svh bg-white">
        <div className="pt-3 pb-3 mb-4 bg-[#fcf8f5]">
          <div className="container mx-auto px-4">
            <Space align="center" className="mb-2">
              <div
                onClick={() => router.back()}
                className="border border-orange-100 size-10 flex items-center justify-center rounded-lg bg-[#fff1e6]"
              >
                <FaAngleLeft className="text-xl text-[#e54f00]" />
              </div>
              <h2 className="text-xl font-semibold">Đơn hàng của tôi</h2>
            </Space>
            <Space className="bg-[#fff1e6] text-[#e86a12] font-semibold w-full p-1 rounded-md">
              👋 Hân hạnh được phục vụ quý khách
            </Space>
          </div>
        </div>

        {orderDetailData.length ? (
          <>
            <div className="container mx-auto px-4 space-y-4">
              {orderDetailData.map((item, key) => (
                <OrderHistoryItem order={item} key={key} />
              ))}
            </div>
          </>
        ) : (
          <div className="h-[50vh] text-slate-500 flex flex-col justify-center items-center gap-5">
            <img src="/icons/empty-box.png" alt="" width={150} />
            <p className="text-center">
              Chưa có món nào được đặt. <br /> Vui lòng chọn món
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
