import { orderApi } from "@/api/order.api";
import { tableApi } from "@/api/table.api";
import AppLoading from "@/components/AppLoading/AppLoading";
import Invoice from "@/components/Invoice/Invoice";
import OrderItem from "@/components/OrderItem/OrderItem";
import { Order, OrderStatusEnum } from "@/types/order";
import { TableSummary } from "@/types/table";
import { formatMoney } from "@/utils/money";
import { Button, Descriptions, Modal, Popconfirm, Space } from "antd";
import { Rule } from "antd/lib/form";
import React, { useImperativeHandle, useState } from "react";
const rules: Rule[] = [{ required: true }];

export interface TableDetailModalRef {
  handleOpen: (table: TableSummary) => void;
}

export const TableDetailModal = React.forwardRef(
  ({ onSubmitOk }: { onSubmitOk: () => void }, ref) => {
    const [visibleModal, setVisibleModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orderDetailData, setOrderDetailData] = useState<Order>();

    useImperativeHandle(
      ref,
      () => {
        return {
          handleOpen(record?: TableSummary) {
            if (!record) return;
            setVisibleModal(true);
            getSummaryOrder(record?.sessionKey);
          },
        };
      },
      []
    );

    const getSummaryOrder = async (sessionKey: string) => {
      try {
        setLoading(true);
        const { data } = await orderApi.summary(sessionKey);
        setOrderDetailData(data);
      } finally {
        setLoading(false);
      }
    };

    const cancelOrder = async () => {
      if (!orderDetailData) return;
      try {
        setLoading(true);
        await orderApi.updateOrdersBySession(
          orderDetailData?.orderCode || "",
          OrderStatusEnum.cancel
        );
        await tableApi.updateSession(orderDetailData?.table._id);
        onSubmitOk();
        setVisibleModal(false);
      } finally {
        setLoading(true);
      }
    };

    return (
      <Modal
        onCancel={() => setVisibleModal(false)}
        open={visibleModal}
        title={"Chi tiết đơn hàng"}
        confirmLoading={loading}
        centered
        footer={
          !loading &&
          orderDetailData && (
            <Space direction="vertical" style={{ width: "100%" }}>
              <Popconfirm
                title={
                  <p className="text-base">Xác nhận hủy các món của bàn này?</p>
                }
                onConfirm={() => cancelOrder()}
                okText={"Hủy đơn"}
                okButtonProps={{ danger: true, size: "large" }}
                cancelText={"Hủy"}
                cancelButtonProps={{ size: "large" }}
              >
                <Button loading={loading} block danger size="large">
                  Hủy đơn
                </Button>
              </Popconfirm>
              <Invoice
                onAfterPrint={() => {
                  setVisibleModal(false);
                  onSubmitOk();
                }}
                order={orderDetailData}
              />
            </Space>
          )
        }
      >
        {loading ? (
          <AppLoading customClass="!h-[300px] max-h-[300px]" />
        ) : (
          <div
            style={{
              background:
                "linear-gradient(109.6deg, rgb(255, 78, 80) 11.2%, rgb(249, 212, 35) 100.2%)",
            }}
          >
            <div className="max-w-[500px] mx-auto bg-white">
              {orderDetailData?._id ? (
                <div className="container mx-auto">
                  <div className="summary bg-slate-100 border border-slate-300 rounded-xl px-4 py-1">
                    <Descriptions
                      className="font-semibold"
                      column={1}
                      contentStyle={{
                        textAlign: "right",
                        width: "100%",
                        display: "block",
                      }}
                    >
                      <Descriptions.Item label="Mã đơn">
                        #{(orderDetailData?.orderCode).toUpperCase()}
                      </Descriptions.Item>
                      <Descriptions.Item label="Bàn">
                        {orderDetailData.table.title}
                      </Descriptions.Item>
                      <Descriptions.Item label="Tổng tiền">
                        {formatMoney(orderDetailData.totalMoney)}đ
                      </Descriptions.Item>
                    </Descriptions>
                  </div>

                  <div className="mt-0 max-h-[calc(100svh-310px)] overflow-auto">
                    {orderDetailData.orderDetails.map((item) => (
                      <OrderItem
                        disableItem
                        data={item}
                        onFetchDetail={() => ""}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-[50vh] text-slate-500 flex flex-col justify-center items-center gap-5">
                  <img src="/icons/empty-box.png" alt="" width={150} />
                  <p className="text-center">Chưa có món</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    );
  }
);
