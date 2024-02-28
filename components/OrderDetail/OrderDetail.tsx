import { orderApi } from "@/api/order.api";
import useOrderStore from "@/store/orderStore";
import { Order, OrderStatusEnum, orderStatusTrans } from "@/types/order";
import { formatUnixTimestamp } from "@/utils/date";
import { Button, Popconfirm, Space, Tag } from "antd";
import { useEffect, useMemo, useState } from "react";
import OrderDetailList from "./components/OrderDetailList";
import { getLastNCharacter } from "@/utils/string";

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

  useEffect(() => {
    fetchDetail(selectedOrder?._id || "");
  }, [selectedOrder]);

  const fetchDetail = async (orderId: string) => {
    if (!orderId) return;
    const { data } = await orderApi.getDetail(orderId);
    setOrderDetailData(data);
  };

  const changeOrderStatus = async (status: OrderStatusEnum) => {
    await orderApi.update(orderDetailData?._id || "", { status });
    fetchDetail(orderDetailData?._id || "");
    fetchOrders();
  };

  if (!orderDetailData) return <></>;
  return (
    <div className={"rounded-lg pl-1 pr-4 pt-10"}>
      <h2 className="text-2xl">
        Chi tiết{" "}
        <span className="text-blue-500 font-bold text-lg">
          #{getLastNCharacter(orderDetailData._id, 5)}
        </span>
      </h2>
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
        <OrderDetailList
          onFetchDetail={() => fetchDetail(orderDetailData._id)}
          order={orderDetailData}
        />
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
