import { orderDetailApi } from "@/api/orderDetail.api";
import { OrderDetail, OrderStatusEnum, orderStatusTrans } from "@/types/order";
import { formatMoney } from "@/utils/money";
import { Divider, Dropdown, Space, Spin, Tag } from "antd";
import { useCallback, useState } from "react";
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
  const [loading, setLoading] = useState(false);
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
    try {
      setLoading(true);
      await orderDetailApi.update(orderDetail._id, { status });
      onFetchDetail();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dropdown
      trigger={["click"]}
      key={data.foodId}
      menu={{ items: getDropDownItems(data) }}
      disabled={disableItem || data.status != OrderStatusEnum.pending}
    >
      <Spin spinning={loading}>
        <div className={"rounded-lg py-2"}>
          <Space
            key={data.foodId}
            className="w-full mb-3 last:mb-0"
            align="start"
          >
            <div className="w-[70px]">
              <img
                className="size-[70px] rounded-md mt-2 object-cover"
                src={data.food.image || "https://placehold.co/50x50"}
              />
            </div>
            <Space direction="vertical" size={1}>
              <p className="text-base mt-1">{data.food.title}</p>
              <Space
                size={0}
                split={<Divider type="vertical" />}
                className="font-semibold mb-1"
              >
                <span className="text-slate-600">x{data.quantity}</span>
                <span className="text-red-600">{formatMoney(data.price)}đ</span>
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
      </Spin>
    </Dropdown>
  );
};

export default OrderItem;
