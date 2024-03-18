"use client";
import { tableApi } from "@/api/table.api";
import {
  TableModal,
  TableModalRef,
} from "@/components/TableFormModal/TableFormModal";
import { useTable } from "@/hooks/useTable";
import { Table as ITable } from "@/types/table";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Popconfirm,
  Popover,
  QRCode,
  Space,
  Table,
  Tooltip,
} from "antd";
import Search from "antd/es/input/Search";
import Column from "antd/es/table/Column";
import { useEffect, useRef } from "react";
import { FaQrcode } from "react-icons/fa6";

export default function TablePage() {
  const { fetchTable, tables, query, loading } = useTable({
    initQuery: {},
  });
  const tableModalRef = useRef<TableModalRef>();

  useEffect(() => {
    fetchTable();
  }, []);

  const handelDelete = async (id: string) => {
    await tableApi.delete(id);
    fetchTable();
  };

  return (
    <>
      <Space style={{ width: 300, marginBottom: 15 }}>
        <Search
          loading={loading}
          placeholder="Nhập tên bàn để tìm kiếm..."
          onSearch={(value) => {
            query.search = value;
            fetchTable();
          }}
          enterButton
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => tableModalRef.current?.handleOpen("create")}
        >
          Thêm mới
        </Button>
      </Space>

      <Table className="table-striped-rows" dataSource={tables} size="small">
        <Column title="Tên bàn" dataIndex="title" key="title" />
        <Column
          align="center"
          title="Vị trí"
          dataIndex="position"
          key="position"
        />
        <Column
          align="center"
          title="QR"
          dataIndex="position"
          key="position"
          render={(text, record: ITable) => (
            <div className="flex justify-center">
              <Popover
                trigger={["click"]}
                placement="left"
                content={
                  <QRCode
                    errorLevel="L"
                    icon="/logo.png"
                    size={200}
                    value={`${process.env.NEXT_PUBLIC_DOMAIN}?table=${record._id}`}
                  />
                }
              >
                <Button icon={<FaQrcode className="translate-y-[2px]" />}>
                  Xem QR
                </Button>
              </Popover>
            </div>
          )}
        />
        <Column
          width={100}
          title="Hành động"
          key="action"
          render={(text, record: ITable) => (
            <Space>
              <Button
                onClick={() =>
                  tableModalRef.current?.handleOpen("update", record as ITable)
                }
                type="primary"
                icon={<EditFilled />}
              >
                Chỉnh sửa
              </Button>
              <Popconfirm
                title={`Bàn này sẽ bị xóa. Tiếp tục?`}
                onConfirm={() => handelDelete(record._id)}
                okText={"Xóa"}
                cancelText={"Hủy"}
              >
                <Button type="primary" danger icon={<DeleteFilled />}>
                  Xóa
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>

      <TableModal ref={tableModalRef} onSubmitOk={fetchTable} />
    </>
  );
}
