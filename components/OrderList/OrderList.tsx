import { Order } from "@/types/order";
import React, { useState } from "react";
import OrderCard from "../OrderCard/OrderCard";
import useOrderStore from "@/store/orderStore";

const OrderList = ({ orders }: { orders: Order[] }) => {
  const setSelectedOrder = useOrderStore((state) => state.setSelectedOrder);
  const selectedOrder = useOrderStore((state) => state.selectedOrder);
  return (
    <div className="order-list grid grid-cols-4 bg-[#4e4cb8] rounded-2xl p-4 gap-4">
      {orders.map((item, index) => (
        <div onClick={() => setSelectedOrder(item)}>
          <OrderCard
            active={item._id == selectedOrder?._id}
            order={item}
            key={index}
          />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
