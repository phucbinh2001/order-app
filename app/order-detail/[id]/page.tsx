"use client";

import { orderApi } from "@/api/order.api";
import AppLoading from "@/components/AppLoading/AppLoading";
import OrderItem from "@/components/OrderItem/OrderItem";
import useOrderStore from "@/store/orderStore";
import { Order } from "@/types/order";
import { formatMoney } from "@/utils/money";
import { getLastNCharacter } from "@/utils/string";
import { Descriptions, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [orderDetailData, setOrderDetailData] = useState<Order>();
  const fetchOrderDetail = async () => {
    if (!params.id) return;
    try {
      setLoading(true);
      const { data } = await orderApi.getDetailById(params.id);
      setOrderDetailData(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [params.id]);
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
              <h2 className="text-xl font-semibold">Chi tiết đơn hàng</h2>
            </Space>
            <Space className="bg-[#fff1e6] text-[#e86a12] font-semibold w-full p-1 rounded-md">
              👋 Hân hạnh được phục vụ quý khách
            </Space>
          </div>
        </div>
        {orderDetailData?._id ? (
          <div className="container mx-auto px-4">
            <div className="summary bg-slate-100 border border-slate-300 rounded-xl px-4 py-2">
              <h2 className="font-bold text-slate-600 mb-2">Thông tin đơn</h2>
              <Descriptions
                className="font-semibold"
                column={1}
                contentStyle={{
                  textAlign: "right",
                  width: "100%",
                  display: "block",
                }}
              >
                <Descriptions.Item label="Mã đơn">
                  #{getLastNCharacter(orderDetailData?._id, 5).toUpperCase()}
                </Descriptions.Item>
                <Descriptions.Item label="Bàn">
                  {orderDetailData.table.title}
                </Descriptions.Item>
                <Descriptions.Item label="Tổng tiền">
                  {formatMoney(orderDetailData.totalMoney)}đ
                </Descriptions.Item>
              </Descriptions>
            </div>

            <div className="mt-5">
              {orderDetailData.orderDetails.map((item) => (
                <OrderItem data={item} onFetchDetail={fetchOrderDetail} />
              ))}
            </div>
          </div>
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
