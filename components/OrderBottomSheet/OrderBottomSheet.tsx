import { Food } from "@/types/food";
import { OrderDetail } from "@/types/order";
import { formatMoney } from "@/utils/money";
import { Button, Drawer, Flex, Input, message } from "antd";
import React, { useImperativeHandle, useRef, useState } from "react";
import QuantityInput from "../QuantityInput/QuantityInput";
import useOrderStore from "@/store/orderStore";

export interface OrderBottomSheetRef {
  handleOpen: (food: Food) => void;
}

export const OrderBottomSheetModal = React.forwardRef(
  ({ onSubmitOk }: { onSubmitOk: () => void }, ref) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFood, setSelectedFood] = useState<Food>();
    const [quantity, setQuantity] = useState(1);

    const addToCard = useOrderStore((state) => state.addToCard);
    const order = useOrderStore((state) => state.order);

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
  }
);

const FoodItem = ({
  food,
  quantity,
  onQuantityChange,
}: {
  food: Food;
  quantity: number;
  onQuantityChange: (value: number) => void;
}) => {
  return (
    <div className="flex rounded-xl mb-3 overflow-hidden ">
      <img className="rounded-xl" width={100} height={100} src={food.image} />
      <div className="flex flex-col w-full p-2 ml-2 relative">
        <h2 className="text-xl font-semibold">{food.title}</h2>
        <p>{food.description}</p>
        <Flex
          justify="space-between"
          align="center"
          className="mt-auto"
          style={{ width: "100%" }}
        >
          <span className="font-semibold text-sm">
            {formatMoney(food.price)}đ
          </span>
          <QuantityInput
            onQuantityChange={onQuantityChange}
            quantity={quantity}
          />
        </Flex>
      </div>
    </div>
  );
};
