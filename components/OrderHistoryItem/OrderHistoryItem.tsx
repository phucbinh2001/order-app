import { Order, orderStatusTrans } from "@/types/order";
import { formatUnixTimestamp } from "@/utils/date";
import { getLastNCharacter } from "@/utils/string";
import { Space, Tag } from "antd";
import clsx from "clsx";
import { useMemo } from "react";
import "./style/style.scss";
import Link from "next/link";

const MAX_ITEMS_TO_SHOW = 2;

const OrderHistoryItem = ({ order }: { order: Order }) => {
  const totalFoods = useMemo(() => {
    if (order?.orderDetails?.length) {
      return order?.orderDetails?.reduce(
        (total, item) => (total += item.quantity),
        0
      );
    } else {
      return 0;
    }
  }, [order]);

  //Số lượng food bị quá MAX_ITEMS_TO_SHOW
  const totalOverNumOfFood = useMemo(() => {
    if (order.orderDetails.length <= MAX_ITEMS_TO_SHOW) return 0;
    const overNumOfFoods = [...order.orderDetails].slice(2);
    return overNumOfFoods.reduce((total, item) => (total += item.quantity), 0);
  }, [order]);

  return (
    <Link href={`order-detail/${order._id}`} className="block">
      <div className={clsx("border shadow-lg rounded-lg p-4 cursor-pointer")}>
        <div className="drag-handle" onClick={(e) => e.stopPropagation()}></div>
        <div className="header w-full justify-between mb-3 border-b border-dashed">
          <div className="flex flex-col w-full">
            <div className="flex items-center w-full">
              <Tag color={"geekblue"} className="font-bold !text-[13px]">
                {order?.table?.title}
              </Tag>
              <Tag
                className="font-bold !text-[13px]"
                color={orderStatusTrans[order.status]?.color}
              >
                {orderStatusTrans[order.status]?.label}
              </Tag>
              <span className="ml-auto inline-block border-l pl-2 font-bold">
                #{getLastNCharacter(order._id, 5).toUpperCase()}
              </span>
            </div>
            <div className="my-2">
              {totalFoods} món • {formatUnixTimestamp(order.createdAt)}
            </div>
          </div>
        </div>
        <div>
          {order.orderDetails.slice(0, MAX_ITEMS_TO_SHOW).map((item) => (
            <Space key={item.foodId} className="w-full mb-3 last:mb-0">
              <img
                className="size-12 rounded-md object-cover"
                src={item.food.image || "https://placehold.co/50x50"}
              />
              <Space direction="vertical">
                <p className="font-semibold">{item.food.title}</p>
                <span>x{item.quantity}</span>
              </Space>
            </Space>
          ))}
          {totalOverNumOfFood > 0 && (
            <span className="font-semibold">
              +{totalOverNumOfFood} món khác
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default OrderHistoryItem;
