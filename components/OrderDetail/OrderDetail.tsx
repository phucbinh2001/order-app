import useOrderStore from "@/store/orderStore";
import { formatUnixTimestamp } from "@/utils/date";
import { Button, Space, Tag } from "antd";
import clsx from "clsx";
import React, { useMemo } from "react";
import { FaNoteSticky } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";

const OrderDetail = () => {
  const selectedOrder = useOrderStore((state) => state.selectedOrder);
  const totalFoods = useMemo(
    () =>
      selectedOrder?.orderDetails.reduce(
        (total, item) => (total += item.quantity),
        0
      ),
    [selectedOrder]
  );
  if (!selectedOrder) return <></>;
  return (
    <div className={"rounded-lg p-4 pt-10"}>
      <h2 className="text-2xl">Chi tiết</h2>
      <Space className="header w-full justify-between mb-3 mt-3 border-b border-dashed">
        <div>
          <Tag color={"geekblue"} className="font-bold !text-[13px]">
            {selectedOrder?.table?.title}
          </Tag>
          <div className="my-2">
            {totalFoods} món • {formatUnixTimestamp(selectedOrder.createdAt)}
          </div>
        </div>
        <HiDotsVertical className="text-2xl text-slate-400" />
      </Space>
      <div>
        {selectedOrder.orderDetails.map((item) => (
          <>
            <Space key={item.foodId} className="w-[100%] mb-3 last:mb-0">
              <img
                className="size-12 rounded-md mt-2"
                src={item.food.image || "https://placehold.co/50x50"}
              />
              <Space size={1} direction="vertical" className="w-full">
                <p className="font-semibold">{item.food.title}</p>
                <span>Số lượng: {item.quantity}</span>
                {item.note && (
                  <Space className="w-full rounded-lg note w-fit">
                    <Space size={1} className="font-bold text-yellow-800">
                      Ghi chú:
                    </Space>
                    <span>{item.note}</span>
                  </Space>
                )}
              </Space>
            </Space>
          </>
        ))}
      </div>
      <div className="btns w-full mt-5">
        <Button className="w-[calc(100%-108px)]" size="large" type="primary">
          Hoàn thành
        </Button>
        <Button className="w-[100px] ml-2" size="large" danger>
          Hủy đơn
        </Button>
      </div>
    </div>
  );
};

export default OrderDetail;
