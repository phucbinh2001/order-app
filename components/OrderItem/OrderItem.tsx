import { orderDetailApi } from "@/api/orderDetail.api";
import { OrderDetail, OrderStatusEnum, orderStatusTrans } from "@/types/order";
import { formatMoney } from "@/utils/money";
import { Divider, Dropdown, Space, Tag } from "antd";
import { useCallback } from "react";
import { FaX } from "react-icons/fa6";
import "./style/style.scss";

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
          label: <a>{"Hủy món"}</a>,
          icon: <FaX />,
          style: { color: "red", fontWeight: 600, height: 56 },
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
      <div className={"rounded-lg py-2"}>
        <Space
          key={data.foodId}
          className="w-full mb-3 last:mb-0"
          align="start"
        >
          <img
            className="size-[70px] rounded-md mt-2 object-cover"
            src={data.food.image || "https://placehold.co/50x50"}
          />
          <Space direction="vertical" size={1}>
            <p className="font-semibold mt-1">{data.food.title}</p>
            <Space
              size={0}
              split={<Divider type="vertical" />}
              className="font-semibold mb-1"
            >
              <span className="text-slate-600">x{data.quantity}</span>
              <span>{formatMoney(data.price)}đ</span>
            </Space>
            <Tag
              color={orderStatusTrans[data.status].color}
              className="font-bold mt-2 inline-block"
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
