"use client";
import useOrderStore from "@/store/orderStore";
import { Food } from "@/types/food";
import { OrderDetail } from "@/types/order";
import { Button, Drawer, Input } from "antd";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import FoodItem from "./components/FoodItem";

export interface OrderBottomSheetRef {
  handleOpen: (food: Food) => void;
}

const OrderBottomSheetModal = React.forwardRef(({}, ref) => {
  const [visible, setVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food>();
  const [quantity, setQuantity] = useState(1);
  const [innerWidth, setInnerWidth] = useState(0);

  const addToCard = useOrderStore((state) => state.addToCard);

  const noteValue = useRef("");

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        handleOpen(food: Food) {
          setVisible(true);
          setSelectedFood(food);
        },
      };
    },
    []
  );

  const handleAddToCard = () => {
    if (!selectedFood) return;
    const orderDetail: Partial<OrderDetail> = {
      foodId: selectedFood?._id || "",
      quantity,
      note: noteValue.current,
      price: selectedFood?.price || 0,
      food: selectedFood,
    };

    addToCard(orderDetail as OrderDetail);
    Swal.fire({
      customClass: "custom-notification",
      position: "top",
      icon: "success",
      width: 157,
      showConfirmButton: false,
      timer: 1000,
      backdrop: "rgba(0,0,0,0.2)",
    });
    setVisible(false);
  };

  return (
    <Drawer
      afterOpenChange={(open) => {
        if (!open) {
          setQuantity(1);
        }
      }}
      height={"max-content"}
      destroyOnClose
      placement="bottom"
      onClose={() => setVisible(false)}
      open={visible}
      closeIcon={<></>}
      title={
        <div className="text-center flex justify-center">
          <div className="w-[50px] bg-slate-500 h-[6px] rounded-full"></div>
        </div>
      }
      style={{
        maxWidth: 500,
        margin: "auto",
        height: "max-content",
      }}
      styles={{
        content: { borderRadius: "20px 20px 0 0", boxShadow: "none" },
        wrapper: { boxShadow: "none" },
        header: { border: "none" },
        body: { paddingBottom: 40, paddingTop: 10 },
      }}
    >
      {selectedFood && (
        <FoodItem
          food={selectedFood}
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
      )}
      <div className="mt-5">
        <label className="font-semibold">Ghi chú</label>
        <Input.TextArea
          rows={3}
          onChange={(e) => (noteValue.current = e.target.value)}
        />
      </div>
      <Button
        icon={<FaCartPlus className="translate-y-[2px]" />}
        onClick={handleAddToCard}
        block
        className="!font-semibold mt-5 btn-custom-lg !bg-gradient-to-b from-[#ff9114] to-[#ff6b04] border-none"
        size="large"
        type="primary"
      >
        Thêm vào giỏ hàng
      </Button>
    </Drawer>
  );
});

export default OrderBottomSheetModal;
