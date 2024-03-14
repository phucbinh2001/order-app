"use client";
import {
  OrderDetailModal,
  OrderDetailModalRef,
} from "@/components/OrderDetailModal/OrderDetailModal";
import { useOrder } from "@/hooks/useOrder";
import { Order, orderStatusTrans } from "@/types/order";
import { formatUnixTimestamp } from "@/utils/date";
import { formatMoney } from "@/utils/money";
import { Button, Space, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import Column from "antd/es/table/Column";
import { useEffect, useRef } from "react";
import { FaReceipt } from "react-icons/fa6";

export default function OrderPage() {
  const { fetchOrders, orders, query, loading } = useOrder({ initQuery: {} });
  const orderDetailModalRef = useRef<OrderDetailModalRef>();

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Space style={{ width: 300, marginBottom: 15 }}>
        <Search
          loading={loading}
          placeholder="Nhập tên món để tìm kiếm..."
          onSearch={(value) => {
            query.search = value;
            fetchOrders();
          }}
          enterButton
        />
      </Space>

      <Table className="table-striped-rows" dataSource={orders} size="small">
        <Column
          width={200}
          title="Mã hóa đơn"
          dataIndex="orderCode"
          key="orderCode"
          render={(text) => (
            <span className="text-[#ff7819] font-semibold">#{text}</span>
          )}
        />
        <Column
          width={100}
          title="Bàn"
          dataIndex={"table"}
          render={(record) => record.title}
        />
        <Column
          width={100}
          title="Tổng tiền"
          dataIndex="totalMoney"
          key="totalMoney"
          align="right"
          render={(text) => formatMoney(text)}
        />
        <Column
          title="Ngày đặt"
          dataIndex="createdAt"
          key="createdAt"
          render={(text) => formatUnixTimestamp(text)}
        />
        <Column
          align="center"
          title="Trạng thái"
          dataIndex="status"
          key="status"
          render={(text, record: Order) => (
            <Tag
              className="font-bold"
              color={orderStatusTrans[record.status].color}
            >
              {orderStatusTrans[record.status].label}
            </Tag>
          )}
        />
        <Column
          width={100}
          title="Hành động"
          key="action"
          render={(text, record: Order) => (
            <Space>
              <Button
                onClick={() =>
                  orderDetailModalRef.current?.handleOpen(record as Order)
                }
                type="primary"
                icon={<FaReceipt className="translate-y-[2px]" />}
              >
                Chi tiết
              </Button>
            </Space>
          )}
        />
      </Table>

      <OrderDetailModal ref={orderDetailModalRef} />
    </>
  );
}
