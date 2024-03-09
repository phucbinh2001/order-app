"use client";
import { orderApi } from "@/api/order.api";
import useOrderStore from "@/store/orderStore";
import { Food } from "@/types/food";
import { OrderDetail } from "@/types/order";
import { formatMoney } from "@/utils/money";
import { Button, Drawer, Flex, Modal, Space, message } from "antd";
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { FaCartShopping, FaTrash } from "react-icons/fa6";
import QuantityInput from "../QuantityInput/QuantityInput";

export interface CartBottomSheetRef {
  handleOpen: (food: Food) => void;
}

export const CartBottomSheet = React.forwardRef(({}, ref) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const resetCart = useOrderStore((state) => state.resetCart);
  const order = useOrderStore((state) => state.order);
  const [innerWidth, setInnerWidth] = useState(0);

  const numOfFoods = useMemo(
    () =>
      order.orderDetails?.reduce((total, item) => {
        total += item.quantity;
        return total;
      }, 0),
    [order]
  );

  const totalMoney = useMemo(
    () =>
      order.orderDetails?.reduce((total, item) => {
        total += item.quantity * item.price;
        return total;
      }, 0),
    [order]
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        handleOpen(food: Food) {
          setVisible(true);
        },
      };
    },
    []
  );

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  const submitOrder = async () => {
    try {
      setLoading(true);
      const dataPost = order;
      await orderApi.create(dataPost);
      message.success("Các món của bạn đang được chuẩn bị. Bạn chờ xíu nhé!");
      resetCart();
      setVisible(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Drawer
        size="large"
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
          body: { paddingTop: 0 },
        }}
        style={{
          maxWidth: innerWidth > 500 ? 500 : "auto",
          margin: "auto",
        }}
        className="relative"
      >
        {!!order.orderDetails?.length ? (
          <>
            <h2 className="text-xl font-semibold sticky top-0 bg-white z-10 mb-0 pb-2">
              Kiểm tra lại đơn hàng
            </h2>
            <Space className="bg-[#fff1e6] text-[#e86a12] font-semibold w-full p-1 rounded-md text-base mb-5">
              <span className="text-xl">👋</span>
              Kiểm tra lại thông tin gọi món của bạn để tránh đặt sai bạn nhé!
            </Space>
            <div className="pb-32 divide-y divide-[#efefef]">
              <>
                {order.orderDetails.map((item) => (
                  <FoodItem key={item.foodId} data={item} />
                ))}
              </>
            </div>
            <div className="absolute bottom-0 w-full left-0 bg-white/80 p-4 pb-10 pt-2 border-t shadow-xl backdrop-blur-xl">
              <Space
                className="text-lg pt-1"
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                Tổng{" "}
                <b className="text-[#e86a12]">{formatMoney(totalMoney)}đ</b>
              </Space>

              <Button
                loading={loading}
                onClick={submitOrder}
                block
                className="!font-semibold mt-2 btn-custom-lg"
                size="large"
                type="primary"
              >
                Đặt ngay
              </Button>
            </div>
          </>
        ) : (
          <Flex
            justify="center"
            align="center"
            className="w-full h-full flex-col gap-2"
          >
            <img src="/icons/empty-box.png" alt="" className="w-[200px]" />
            <h2 className="text-center text-slate-600">Bạn chưa chọn món</h2>
          </Flex>
        )}
      </Drawer>
      <div
        onClick={() => setVisible(true)}
        className="py-4 px-5 bg-orange-500 rounded-lg flex items-center w-full font-semibold text-white gap-2 justify-center"
      >
        <FaCartShopping /> Các món đã chọn{" "}
        <span className="text-xs opacity-80">●</span> {numOfFoods} món
      </div>
    </>
  );
});

const FoodItem = ({ data }: { data: OrderDetail }) => {
  const deleteItem = useOrderStore((state) => state.deleteItem);
  const updateItemQuantity = useOrderStore((state) => state.updateItemQuantity);

  const confirmDelete = () => {
    Modal.confirm({
      className: "confirm-modal-custom",
      centered: true,
      icon: <></>,
      style: { textAlign: "center" },
      title: (
        <h3 className="flex flex-col items-center justify-center gap-2 text-lg text-red-500">
          <FaTrash className="text-3xl" /> Xác nhận xóa món
        </h3>
      ),
      content: "Món này sẽ bị xóa khỏi giỏ hàng. Tiếp tục?",
      okText: "Xóa",
      okButtonProps: { danger: true, size: "large" },
      cancelButtonProps: { size: "large" },
      cancelText: "Đóng",
      onOk: () => deleteItem(data.foodId),
      styles: {
        footer: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    });
  };

  return (
    <div className="flex overflow-hidden py-3">
      <img
        className="rounded-xl aspect-square object-cover"
        width={100}
        src={data.food.image}
      />
      <div className="flex flex-col w-full p-2 ml-2 relative">
        <h2 className="text-xl font-semibold">{data.food.title}</h2>
        <p>{data.food.description}</p>
        <p>{data.note}</p>
        <Flex
          justify="space-between"
          align="center"
          className="mt-auto"
          style={{ width: "100%" }}
        >
          <span className="font-semibold text-sm">
            {formatMoney(data.price)}đ
          </span>
          <div className="flex items-center gap-2">
            <QuantityInput
              onQuantityChange={(newQuantity) => {
                updateItemQuantity(data.foodId, newQuantity);
              }}
              quantity={data.quantity}
            />
            <div
              className="size-10 border rounded-md flex items-center justify-center"
              onClick={confirmDelete}
            >
              <FaTrash className="text-red-500 text-base" />
            </div>
          </div>
        </Flex>
      </div>
    </div>
  );
};
