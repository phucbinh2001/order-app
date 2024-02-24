import { Order } from "@/types/order";
import { formatUnixTimestamp } from "@/utils/date";
import { Space, Tag } from "antd";
import { useMemo } from "react";
import { HiDotsVertical } from "react-icons/hi";
import "./style/style.scss";
import clsx from "clsx";

const OrderCard = ({ order, active }: { order: Order; active: boolean }) => {
  const totalFoods = useMemo(
    () =>
      order.orderDetails.reduce((total, item) => (total += item.quantity), 0),
    [order]
  );
  return (
    <div className={clsx("order-card rounded-lg p-4", active && "active")}>
      <Space className="header w-full justify-between mb-3 ">
        <div>
          <Tag
            color={active ? "geekblue" : "geekblue"}
            bordered={active}
            className="font-bold !text-[13px]"
          >
            {order?.table?.title}
          </Tag>
          <div className="my-2">
            {totalFoods} món • {formatUnixTimestamp(order.createdAt)}
          </div>
        </div>
        <HiDotsVertical className="text-2xl text-slate-400" />
      </Space>
      <div>
        {order.orderDetails.map((item) => (
          <Space key={item.foodId} className="w-full mb-3 last:mb-0">
            <img
              className="size-12 rounded-md"
              src={item.food.image || "https://placehold.co/50x50"}
            />
            <Space direction="vertical">
              <p className="font-semibold">{item.food.title}</p>
              <span>x{item.quantity}</span>
            </Space>
          </Space>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
