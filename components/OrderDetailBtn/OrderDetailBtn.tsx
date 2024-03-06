import useOrderStore from "@/store/orderStore";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { FaReceipt } from "react-icons/fa6";

const OrderDetailBtn = () => {
  const order = useOrderStore((state) => state.order);
  const haveOrderInCart = !!order.orderDetails?.length;

  if (!order.sessionKey) return <></>;

  return (
    <Link href={"/order-detail"}>
      <div
        className={clsx(
          `bg-[#fff1e6] h-5 rounded-full shadow-lg  fixed bottom-5 right-[180px] text-white py-6  px-4 pl-1 pr-1 flex items-center justify-center font-bold gap-2 text-xl`,
          !haveOrderInCart && "!pr-4 !right-2"
        )}
      >
        <div className="bg-white p-[10px] rounded-full shadow-xl">
          <FaReceipt className="text-[#e86a12]" />
        </div>
        {!order.orderDetails?.length && (
          <div className="flex flex-col text-[#e86a12]">
            <p>Đơn của tôi</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default OrderDetailBtn;
