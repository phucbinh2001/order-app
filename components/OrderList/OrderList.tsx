import { Order } from "@/types/order";
import React, { useState } from "react";
import OrderCard from "../OrderCard/OrderCard";

const OrderList = ({ orders }: { orders: Order[] }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="order-list grid grid-cols-4 bg-[#4e4cb8] rounded-2xl p-4 gap-4">
      {orders.map((item, index) => (
        <div onClick={() => setActive(index)}>
          <OrderCard active={index == active} order={item} key={index} />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
