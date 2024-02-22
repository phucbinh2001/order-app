import { Food } from "@/types/Food";
import { formatMoney } from "@/utils/money";
import { Button, Divider, Drawer, Flex, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useImperativeHandle, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import QuantityInput from "../QuantityInput/QuantityInput";

export interface OrderBottomSheetRef {
  handleOpen: (food: Food) => void;
}

export const OrderBottomSheetModal = React.forwardRef(
  ({ onSubmitOk }: { onSubmitOk: () => void }, ref) => {
    const [form] = useForm();
    const [visibleModal, setVisibleModal] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedFood, setSelectedFood] = useState<Food>();

    useImperativeHandle(
      ref,
      () => {
        return {
          handleOpen(food: Food) {
            setVisibleModal(true);
            setSelectedFood(food);
          },
        };
      },
      []
    );

    return (
      <Drawer
        // size="large"
        placement="bottom"
        onClose={() => setVisibleModal(false)}
        open={visibleModal}
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
        {selectedFood && <FoodItem data={selectedFood} />}
        <Divider />
        <div className="mt-5">
          <label className="font-semibold">Ghi chú</label>
          <Input.TextArea rows={3} />
        </div>

        <Button
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

const FoodItem = ({ data }: { data: Food }) => {
  return (
    <div className="flex rounded-xl mb-3 overflow-hidden ">
      <img
        className="rounded-xl"
        width={100}
        src={
          "https://cdn.tgdd.vn/2021/12/CookDishThumb/cach-lam-bun-dau-mam-tom-ngon-ngat-ngay-an-mot-lan-la-ghien-thumb-620x620.jpg"
        }
      />
      <div className="flex flex-col w-full p-2 ml-2 relative">
        <h2 className="text-xl font-semibold">{data.title}</h2>
        <p>{data.description}</p>
        <Flex
          justify="space-between"
          align="center"
          className="mt-auto"
          style={{ width: "100%" }}
        >
          <span className="font-semibold text-sm">
            {formatMoney(data.price)}đ
          </span>
          <QuantityInput />
        </Flex>
      </div>
    </div>
  );
};
