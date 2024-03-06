import useOrderStore from "@/store/orderStore";
import { Food } from "@/types/food";
import { OrderDetail } from "@/types/order";
import { Button, Drawer, Input, message } from "antd";
import React, { useImperativeHandle, useRef, useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import FoodItem from "./components/FoodItem";

export interface OrderBottomSheetRef {
  handleOpen: (food: Food) => void;
}

const OrderBottomSheetModal = React.forwardRef(({}, ref) => {
  const [visible, setVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food>();
  const [quantity, setQuantity] = useState(1);

  const addToCard = useOrderStore((state) => state.addToCard);

  const noteValue = useRef("");

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
    message.success("Đã thêm món vào giỏ hàng");
    setVisible(false);
  };

  return (
    <Drawer
      width={window.innerWidth > 1200 ? 800 : "auto"}
      afterOpenChange={(open) => {
        if (!open) {
          setQuantity(1);
        }
      }}
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
        maxWidth: window.innerWidth > 500 ? 500 : "auto",
        margin: "auto",
      }}
      styles={{
        content: { borderRadius: "20px 20px 0 0", boxShadow: "none" },
        wrapper: { boxShadow: "none" },
        header: { border: "none" },
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
        className="!font-semibold mt-5"
        size="large"
        type="primary"
      >
        Thêm vào giỏ hàng
      </Button>
    </Drawer>
  );
});

export default OrderBottomSheetModal;
