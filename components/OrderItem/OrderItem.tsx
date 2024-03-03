import { OrderDetail, OrderStatusEnum, orderStatusTrans } from "@/types/order";
import { Dropdown, Space, Tag } from "antd";
import "./style/style.scss";
import { useCallback } from "react";
import { FaBowlRice, FaCheck, FaX } from "react-icons/fa6";
import { orderDetailApi } from "@/api/orderDetail.api";

const OrderItem = ({
  data,
  disableItem,
  onFetchDetail,
}: {
  data: OrderDetail;
  disableItem?: boolean;
  onFetchDetail: () => void;
}) => {
  const getDropDownItems = useCallback(
    (item: OrderDetail) => {
      return [
        {
          key: OrderStatusEnum.cancel,
          label: <a>{"Hủy đơn"}</a>,
          icon: <FaX />,
          style: { color: "red", fontWeight: 600 },
          onClick: () => changeOrderDetailStatus(item, OrderStatusEnum.cancel),
        },
      ];
    },
    [data]
  );

  const changeOrderDetailStatus = async (
    orderDetail: OrderDetail,
    status: OrderStatusEnum
  ) => {
    await orderDetailApi.update(orderDetail._id, { status });

    onFetchDetail();
  };

  return (
    <Dropdown
      trigger={["click"]}
      key={data.foodId}
      menu={{ items: getDropDownItems(data) }}
      disabled={disableItem}
    >
      <div className={"rounded-lg mb-4"}>
        <Space
          key={data.foodId}
          className="w-full mb-3 last:mb-0"
          align="start"
        >
          <img
            className="size-[100px] rounded-md mt-2 object-cover"
            src={data.food.image || "https://placehold.co/50x50"}
          />
          <Space direction="vertical" size={1}>
            <p className="font-semibold mt-1">{data.food.title}</p>
            <span>Số lượng: {data.quantity}</span>
            <Tag
              color={orderStatusTrans[data.status].color}
              className="font-bold"
            >
              {orderStatusTrans[data.status].label}
            </Tag>
          </Space>
        </Space>
      </div>
    </Dropdown>
  );
};

export default OrderItem;
