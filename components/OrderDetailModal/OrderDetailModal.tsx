import { orderApi } from "@/api/order.api";
import { Order, orderStatusTrans } from "@/types/order";
import { formatMoney } from "@/utils/money";
import { Descriptions, Modal, Tag } from "antd";
import { Rule } from "antd/lib/form";
import React, { useImperativeHandle, useState } from "react";
import AppLoading from "../AppLoading/AppLoading";
import OrderItem from "../OrderItem/OrderItem";
const rules: Rule[] = [{ required: true }];

export interface OrderDetailModalRef {
  handleOpen: (record: Order) => void;
}

export const OrderDetailModal = React.forwardRef(({}, ref) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order>();

  useImperativeHandle(
    ref,
    () => {
      return {
        handleOpen(record?: Order) {
          fetchDetail(record?._id || "");
          setVisibleModal(true);
        },
      };
    },
    []
  );

  const fetchDetail = async (orderId: string) => {
    try {
      setLoading(true);
      const { data } = await orderApi.getDetail(orderId);
      setOrder(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      onCancel={() => setVisibleModal(false)}
      open={visibleModal}
      confirmLoading={loading}
      destroyOnClose
      footer={null}
      styles={{ body: { padding: 0 } }}
      title="Chi tiết đơn hàng"
      style={{ top: 20 }}
    >
      {loading ? (
        <AppLoading />
      ) : (
        <>
          <div>
            <div className="summary bg-slate-100 border border-slate-300 rounded-xl px-4 py-2 pb-0 mt-5">
              <h2 className="font-bold text-slate-600 mb-2">Thông tin đơn</h2>
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
                  <span className="text-[#ff7819]">#{order?.orderCode}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Bàn">
                  {order?.table?.title}
                </Descriptions.Item>
                <Descriptions.Item label="Tổng tiền">
                  {formatMoney(order?.totalMoney)}đ
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  {order && (
                    <Tag
                      className="font-bold !mr-0"
                      color={orderStatusTrans[order.status].color}
                    >
                      {orderStatusTrans[order.status].label}
                    </Tag>
                  )}
                </Descriptions.Item>
              </Descriptions>
            </div>

            <div className="mt-5">
              {order?.orderDetails?.map((item) => (
                <OrderItem data={item} onFetchDetail={() => ""} disableItem />
              ))}
            </div>
          </div>
        </>
      )}
    </Modal>
  );
});
