import { orderApi } from "@/api/order.api";
import { orderDetailApi } from "@/api/orderDetail.api";
import useOrderStore from "@/store/orderStore";
import {
  Order,
  OrderDetail,
  OrderStatusEnum,
  orderStatusTrans,
} from "@/types/order";
import { formatUnixTimestamp } from "@/utils/date";
import {
  Badge,
  Button,
  Dropdown,
  MenuProps,
  Popconfirm,
  Space,
  Tag,
} from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaBowlRice, FaCheck, FaX } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";

const OrderDetail = () => {
  const [orderDetailData, setOrderDetailData] = useState<Order>();
  const selectedOrder = useOrderStore((state) => state.selectedOrder);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);

  const totalFoods = useMemo(
    () =>
      orderDetailData?.orderDetails?.reduce(
        (total, item) => (total += item.quantity),
        0
      ),
    [orderDetailData]
  );

  const getDropDownItems = useCallback((item: OrderDetail) => {
    return [
      {
        key: OrderStatusEnum.complete,
        label: <a>{orderStatusTrans[OrderStatusEnum.complete].label}</a>,
        icon: <FaCheck />,
        style: { color: "#52c41a", fontWeight: 600 },
        onClick: () => changeOrderDetailStatus(item, OrderStatusEnum.complete),
      },
      {
        key: OrderStatusEnum.cancel,
        label: <a>{"Hủy đơn"}</a>,
        icon: <FaX />,
        style: { color: "red", fontWeight: 600 },
        onClick: () => changeOrderDetailStatus(item, OrderStatusEnum.cancel),
      },
      {
        key: OrderStatusEnum.outOfStock,
        label: <a>{"Tạm hết"}</a>,
        icon: <FaBowlRice />,
        style: { color: "orange", fontWeight: 600 },
        onClick: () =>
          changeOrderDetailStatus(item, OrderStatusEnum.outOfStock),
      },
    ];
  }, []);

  useEffect(() => {
    fetchDetail(selectedOrder?._id || "");
  }, [selectedOrder]);

  const fetchDetail = async (orderId: string) => {
    if (!orderId) return;
    const { data } = await orderApi.getDetail(orderId);
    setOrderDetailData(data);
  };

  const changeOrderDetailStatus = async (
    orderDetail: OrderDetail,
    status: OrderStatusEnum
  ) => {
    await orderDetailApi.update(orderDetail._id, { status });
    fetchDetail(selectedOrder?._id || "");
    fetchOrders();
  };

  const changeOrderStatus = async (status: OrderStatusEnum) => {
    await orderApi.update(orderDetailData?._id || "", { status });
    fetchDetail(selectedOrder?._id || "");
    fetchOrders();
  };

  if (!orderDetailData) return <></>;
  return (
    <div className={"rounded-lg pl-1 pr-4 pt-10"}>
      <h2 className="text-2xl">Chi tiết</h2>
      <Space className="header w-full justify-between mb-3 mt-3 border-b border-dashed">
        <div>
          <Tag color={"geekblue"} className="font-bold !text-[13px]">
            {orderDetailData?.table?.title}
          </Tag>{" "}
          <Tag
            className="font-bold !text-[13px]"
            color={orderStatusTrans[orderDetailData?.status]?.color}
          >
            {orderStatusTrans[orderDetailData?.status]?.label}
          </Tag>
          <div className="my-2">
            {totalFoods} món • {formatUnixTimestamp(orderDetailData?.createdAt)}
          </div>
        </div>
      </Space>
      <div>
        {orderDetailData?.orderDetails?.map((item) => (
          <Badge.Ribbon
            style={{ fontWeight: 700 }}
            text={orderStatusTrans[item.status].label}
            color={orderStatusTrans[item.status].badgeColor}
            key={item.foodId}
          >
            <Dropdown
              trigger={["click"]}
              key={item.foodId}
              menu={{ items: getDropDownItems(item) }}
            >
              <div className="w-full mb-3 last:mb-0 flex gap-2 shadow-lg pt-2 pl-2 pb-1 rounded-xl cursor-pointer">
                <img
                  className="size-12 rounded-md mt-2"
                  src={item.food.image || "https://placehold.co/50x50"}
                />
                <Space size={1} direction="vertical" className="w-full">
                  <Space className="w-full justify-between">
                    <p className="font-semibold">{item.food.title}</p>
                    <HiDotsVertical className="text-xl text-slate-400" />
                  </Space>
                  <span>Số lượng: {item.quantity}</span>
                  {item.note && (
                    <Space className="w-full rounded-lg note w-fit">
                      <Space size={1} className="font-bold text-yellow-800">
                        Ghi chú:
                      </Space>
                      <span>{item.note}</span>
                    </Space>
                  )}
                </Space>
              </div>
            </Dropdown>
          </Badge.Ribbon>
        ))}
      </div>
      <div
        className="btns w-full mt-5"
        hidden={orderDetailData?.status != OrderStatusEnum.pending}
      >
        <Popconfirm
          title={`Đơn hàng sẽ được đánh dấu là đã hoàn thành. Tiếp tục?`}
          onConfirm={() => changeOrderStatus(OrderStatusEnum.complete)}
          okText={"Xác nhận"}
          cancelText={"Đóng"}
        >
          <Button className="w-[calc(100%-108px)]" size="large" type="primary">
            Hoàn thành
          </Button>
        </Popconfirm>
        <Popconfirm
          title={`Đơn hàng sẽ bị hủy. Tiếp tục?`}
          onConfirm={() => changeOrderStatus(OrderStatusEnum.cancel)}
          okText={"Hủy đơn"}
          okButtonProps={{ danger: true }}
          cancelText={"Đóng"}
        >
          <Button className="w-[100px] ml-2" size="large" danger>
            Hủy đơn
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default OrderDetail;
