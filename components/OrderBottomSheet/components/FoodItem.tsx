import QuantityInput from "@/components/QuantityInput/QuantityInput";
import { Food } from "@/types/food";
import { formatMoney } from "@/utils/money";
import { Flex } from "antd";
import React from "react";

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

export default FoodItem;
