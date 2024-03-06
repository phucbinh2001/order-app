import { orderApi } from "@/api/order.api";
import useOrderStore from "@/store/orderStore";
import { Order, OrderStatusEnum, orderStatusTrans } from "@/types/order";
import { formatUnixTimestamp } from "@/utils/date";
import { getLastNCharacter } from "@/utils/string";
import { Button, Popconfirm, Space, Tag } from "antd";
import { useEffect, useMemo, useState } from "react";
import AppLoading from "../AppLoading/AppLoading";
import OrderDetailList from "./components/OrderDetailList";

const OrderDetail = () => {
  const [orderDetailData, setOrderDetailData] = useState<Order>();
  const [loading, setLoading] = useState(false);
  const selectedOrder = useOrderStore((state) => state.selectedOrder);
  const setSelectedOrder = useOrderStore((state) => state.setSelectedOrder);
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

  const fetchDetail = async (orderId: string, isLoading: boolean = true) => {
    try {
      if (isLoading) {
        setLoading(true);
      }
      if (!orderId) return setOrderDetailData(undefined);
      const { data } = await orderApi.getDetailById(orderId);
      setOrderDetailData(data);
    } finally {
      setLoading(false);
    }
  };

  const changeOrderStatus = async (status: OrderStatusEnum) => {
    await orderApi.update(orderDetailData?._id || "", { status });
    fetchOrders({
      status: OrderStatusEnum.pending,
    });
    setSelectedOrder(undefined);
  };
  if (loading) return <AppLoading />;
  if (!orderDetailData)
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-5">
        <img width={200} src="/icons/empty-box.png" />
        <h2 className="text-slate-500">Chọn một thực đơn để xem chi tiết</h2>
      </div>
    );
  return (
    <div className={"rounded-lg pl-1 pr-4 h-screen overflow-auto relative"}>
      <div className="sticky top-0 z-10 bg-white pt-10">
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
              {totalFoods} món •{" "}
              {formatUnixTimestamp(orderDetailData?.createdAt)}
            </div>
          </div>
        </Space>
      </div>
      <div>
        <OrderDetailList
          onFetchDetail={() => fetchDetail(orderDetailData._id, false)}
          order={orderDetailData}
        />
      </div>
      <div className="w-[100%] bottom-4 sticky bg-white z-10">
        <div
          className="bottom-4 flex w-full"
          hidden={orderDetailData?.status != OrderStatusEnum.pending}
        >
          <Popconfirm
            title={`Đơn hàng sẽ được đánh dấu là đã hoàn thành. Tiếp tục?`}
            onConfirm={() => changeOrderStatus(OrderStatusEnum.complete)}
            okText={"Xác nhận"}
            cancelText={"Đóng"}
          >
            <Button
              className="w-[calc(100%-50px)] !font-semibold"
              size="large"
              type="primary"
            >
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
            <Button
              className="w-[100px] ml-2 !font-semibold"
              size="large"
              danger
            >
              Hủy đơn
            </Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
