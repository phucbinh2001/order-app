import { Order, orderStatusTrans } from "@/types/order";
import { formatUnixTimestamp } from "@/utils/date";
import { getLastNCharacter } from "@/utils/string";
import { Space, Tag } from "antd";
import clsx from "clsx";
import { useMemo } from "react";
import "./style/style.scss";

const MAX_ITEMS_TO_SHOW = 2;

const OrderCard = ({ order, active }: { order: Order; active: boolean }) => {
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
    <div className={clsx("order-card rounded-lg p-4", active && "active")}>
      <div className="drag-handle" onClick={(e) => e.stopPropagation()}></div>
      <div className="header w-full mb-3 ">
        <div className="flex justify-between">
          <Space size={1}>
            <Tag
              color={"geekblue"}
              bordered={active}
              className="font-bold !text-[13px]"
            >
              {order?.table?.title}
            </Tag>
            <Tag
              className="font-bold !text-[13px]"
              color={orderStatusTrans[order.status]?.color}
            >
              {orderStatusTrans[order.status]?.label}
            </Tag>
          </Space>

          <span className="ml-auto inline-block pl-2 font-bold">
            #{getLastNCharacter(order._id, 5).toUpperCase()}
          </span>
        </div>
        <div className="my-2">
          {totalFoods} món • {formatUnixTimestamp(order.createdAt)}
        </div>
      </div>
      <div>
        {order.orderDetails.slice(0, MAX_ITEMS_TO_SHOW).map((item) => (
          <Space key={item.foodId} className="w-full mb-3 last:mb-0">
            <div className="min-w-12">
              <img
                className="size-12 rounded-md object-cover"
                src={item.food.image || "https://placehold.co/50x50"}
              />
            </div>
            <Space direction="vertical">
              <p className="font-semibold line-clamp-2">{item.food.title}</p>
              <span>x{item.quantity}</span>
            </Space>
          </Space>
        ))}
        {totalOverNumOfFood > 0 && (
          <span className="font-semibold">+{totalOverNumOfFood} món khác</span>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
