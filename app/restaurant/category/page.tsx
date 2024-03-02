"use client";
import { categoryApi } from "@/api/category.api";
import {
  CategoryModal,
  CategoryModalRef,
} from "@/components/CategoryFormModal/CategoryFormModal";
import { useCategory } from "@/hooks/useCategory";
import { Category } from "@/types/category";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import Search from "antd/es/input/Search";
import Column from "antd/es/table/Column";
import { useEffect, useRef } from "react";

export default function CategoryPage() {
  const { fetchCategories, categories, query, loading } = useCategory({
    initQuery: {},
  });
  const categoryModalRef = useRef<CategoryModalRef>();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handelDelete = async (id: string) => {
    await categoryApi.delete(id);
    fetchCategories();
  };

  return (
    <>
      <Space style={{ width: 300, marginBottom: 15 }}>
        <Search
          loading={loading}
          placeholder="Nhập tên danh mục để tìm kiếm..."
          onSearch={(value) => {
            query.search = value;
            fetchCategories();
          }}
          enterButton
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => categoryModalRef.current?.handleOpen("create")}
        >
          Thêm mới
        </Button>
      </Space>

      <Table
        className="table-striped-rows"
        dataSource={categories}
        size="small"
      >
        <Column
          align="center"
          width={80}
          dataIndex="image"
          key="image"
          render={(text) => (
            <img className="size-14 rounded-lg object-cover" src={text} />
          )}
        />
        <Column title="Tên danh mục" dataIndex="title" key="title" />
        <Column
          align="center"
          title="Vị trí"
          dataIndex="position"
          key="position"
        />
        <Column
          width={100}
          title="Hành động"
          key="action"
          render={(text, record: Category) => (
            <Space>
              <Button
                onClick={() =>
                  categoryModalRef.current?.handleOpen(
                    "update",
                    record as Category
                  )
                }
                type="primary"
                icon={<EditFilled />}
              >
                Chỉnh sửa
              </Button>
              <Popconfirm
                title={`Danh mục này sẽ bị xóa. Tiếp tục?`}
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

      <CategoryModal ref={categoryModalRef} onSubmitOk={fetchCategories} />
    </>
  );
}
