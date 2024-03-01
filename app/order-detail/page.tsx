"use client";

import { orderApi } from "@/api/order.api";
import AppLoading from "@/components/AppLoading/AppLoading";
import OrderItem from "@/components/OrderItem/OrderItem";
import { Order } from "@/types/order";
import { formatMoney } from "@/utils/money";
import { getLastNCharacter } from "@/utils/string";
import { Descriptions, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

const tempId = "65daafc3d6090135a72881f7";

export default function OrderDetailPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [orderDetailData, setOrderDetailData] = useState<Order>();
  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      const { data } = await orderApi.getDetail(tempId);
      setOrderDetailData(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);
  if (loading) return <AppLoading />;
  if (!orderDetailData) return <></>;
  return (
    <>
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
            👋 Đơn hàng của bạn đang được chuẩn bị. Bạn chờ xíu nhé!
          </Space>
        </div>
      </div>
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
    </>
  );
}
