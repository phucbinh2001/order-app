"use client";
import { tableApi } from "@/api/table.api";
import {
  TableModal,
  TableModalRef,
} from "@/components/TableFormModal/TableFormModal";
import { useTable } from "@/hooks/useTable";
import { Table as ITable } from "@/types/table";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import Search from "antd/es/input/Search";
import Column from "antd/es/table/Column";
import { useEffect, useRef } from "react";

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
          placeholder="Nhập tên món để tìm kiếm..."
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
