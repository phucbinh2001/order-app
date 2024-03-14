"use client";
import { foodApi } from "@/api/food.api";
import {
  FoodModal,
  FoodModalRef,
} from "@/components/FoodFormModal/FoodFormModal";
import { useFood } from "@/hooks/useFood";
import { Food } from "@/types/food";
import { formatMoney } from "@/utils/money";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import Search from "antd/es/input/Search";
import Column from "antd/es/table/Column";
import { useEffect, useRef } from "react";

export default function FoodPage() {
  const { fetchFoods, foods, query, loading } = useFood({
    initQuery: { orderBy: "createdAt" },
  });
  const foodModalRef = useRef<FoodModalRef>();

  useEffect(() => {
    fetchFoods();
  }, []);

  const handelDelete = async (id: string) => {
    await foodApi.delete(id);
    fetchFoods();
  };

  return (
    <>
      <Space style={{ width: 300, marginBottom: 15 }}>
        <Search
          loading={loading}
          placeholder="Nhập tên món để tìm kiếm..."
          onSearch={(value) => {
            query.search = value;
            fetchFoods();
          }}
          enterButton
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => foodModalRef.current?.handleOpen("create")}
        >
          Thêm mới
        </Button>
      </Space>

      <Table className="table-striped-rows" dataSource={foods} size="small">
        <Column
          align="center"
          width={80}
          dataIndex="image"
          key="image"
          render={(text) => (
            <img className="size-14 rounded-lg object-cover" src={text} />
          )}
        />
        <Column width={200} title="Tên món" dataIndex="title" key="title" />
        <Column
          width={100}
          title="Giá"
          dataIndex="price"
          key="price"
          align="right"
          render={(text) => formatMoney(text)}
        />
        <Column
          title="Danh mục"
          dataIndex="category"
          key="category"
          render={(item) => item?.title}
        />
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
          render={(text, record: Food) => (
            <Space>
              <Button
                onClick={() =>
                  foodModalRef.current?.handleOpen("update", record as Food)
                }
                type="primary"
                icon={<EditFilled />}
              >
                Chỉnh sửa
              </Button>
              <Popconfirm
                title={`Món ăn này sẽ bị xóa. Tiếp tục?`}
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

      <FoodModal ref={foodModalRef} onSubmitOk={fetchFoods} />
    </>
  );
}
