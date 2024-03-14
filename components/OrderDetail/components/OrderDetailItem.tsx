import { orderDetailApi } from "@/api/orderDetail.api";
import useOrderStore from "@/store/orderStore";
import { OrderDetail, OrderStatusEnum, orderStatusTrans } from "@/types/order";
import { Badge, Dropdown, Space, Spin, Tag } from "antd";
import { useCallback, useState } from "react";
import { FaBowlRice, FaCheck, FaX } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { PiDotsSixVerticalBold } from "react-icons/pi";

const OrderDetailItem = ({
  orderDetail,
  onFetchDetail,
}: {
  orderDetail: OrderDetail;
  onFetchDetail: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);

  const getDropDownItems = useCallback((item: OrderDetail) => {
    return [
      {
        key: OrderStatusEnum.complete,
        label: <a>{orderStatusTrans[OrderStatusEnum.complete].label}</a>,
        icon: <FaCheck />,
        style: {
          color: "#52c41a",
          fontWeight: 600,
          height: "40px",
        },
        onClick: () => changeOrderDetailStatus(item, OrderStatusEnum.complete),
      },
      {
        key: OrderStatusEnum.cancel,
        label: <a>{"Hủy đơn"}</a>,
        icon: <FaX />,
        style: {
          color: "red",
          fontWeight: 600,
          height: "40px",
        },
        onClick: () => changeOrderDetailStatus(item, OrderStatusEnum.cancel),
      },
      {
        key: OrderStatusEnum.outOfStock,
        label: <a>{"Tạm hết"}</a>,
        icon: <FaBowlRice />,
        style: {
          color: "orange",
          fontWeight: 600,
          height: "40px",
        },
        onClick: () =>
          changeOrderDetailStatus(item, OrderStatusEnum.outOfStock),
      },
    ];
  }, []);

  const changeOrderDetailStatus = async (
    orderDetail: OrderDetail,
    status: OrderStatusEnum
  ) => {
    try {
      setLoading(true);
      await orderDetailApi.update(orderDetail._id, { status });

      onFetchDetail();
      fetchOrders({
        status: OrderStatusEnum.pending,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Dropdown
        trigger={["click"]}
        key={orderDetail.foodId}
        menu={{ items: getDropDownItems(orderDetail) }}
      >
        <div className="bg-white w-full mb-3 last:mb-0 flex gap-2 shadow-lg pt-2 pl-2 pb-1 rounded-xl cursor-pointer">
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center cursor-grab drag-handle"
          >
            <PiDotsSixVerticalBold className="text-lg" />
          </div>
          <div className="min-w-12">
            <img
              className="size-12 rounded-md mt-2 object-cover"
              src={orderDetail.food.image || "https://placehold.co/50x50"}
            />
          </div>
          <Space size={1} direction="vertical" className="w-full">
            <Space className="w-full justify-between">
              <p className="font-semibold line-clamp-2 min-h-10">
                {orderDetail.food.title}
              </p>
              <Tag color={orderStatusTrans[orderDetail.status].color}>
                {orderStatusTrans[orderDetail.status].label}
              </Tag>
            </Space>
            <span>Số lượng: {orderDetail.quantity}</span>
            {orderDetail.note && (
              <Space className="w-full rounded-lg note w-fit">
                <Space size={1} className="font-bold text-yellow-800">
                  Ghi chú:
                </Space>
                <span>{orderDetail.note}</span>
              </Space>
            )}
          </Space>
        </div>
      </Dropdown>
    </Spin>
  );
};

export default OrderDetailItem;
