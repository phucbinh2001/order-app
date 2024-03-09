"use client";
import { categoryApi } from "@/api/category.api";
import { orderApi } from "@/api/order.api";
import { tableApi } from "@/api/table.api";
import { CartBottomSheet } from "@/components/CartBottomSheet/CartBottomSheet";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import FoodList from "@/components/FoodList/FoodList";
import OrderBottomSheetModal, {
  OrderBottomSheetRef,
} from "@/components/OrderBottomSheet/OrderBottomSheet";
import OrderDetailBtn from "@/components/OrderDetailBtn/OrderDetailBtn";
import { socketAction } from "@/constants";
import useOrderStore from "@/store/orderStore";
import { Category } from "@/types/category";
import { Table } from "@/types/table";
import { socket } from "@/utils/socket";
import { Flex, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { FaSortDown } from "react-icons/fa6";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories?.[0]
  );
  const [tables, setTables] = useState<Table[]>([]);
  const orderBottomSheetRef = useRef<OrderBottomSheetRef>();

  const updateTableId = useOrderStore((state) => state.updateTableId);
  const order = useOrderStore((state) => state.order);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const { data } = await categoryApi.findAll();
    fetchTables();
    setCategories(data);
    setSelectedCategory(data?.[0]);
  };

  const fetchTables = async () => {
    const { data: tableData } = await tableApi.findAll();
    setTables(tableData);

    const selectedTableId = order.tableId;
    if (selectedTableId) {
      const find = tableData.find((item: Table) => item._id == selectedTableId);
      if (find) {
        updateTableId(find._id, find.sessionKey);
      }
    } else {
      updateTableId(tableData?.[0]?._id, tableData?.[0]?.sessionKey);
    }
  };

  useEffect(() => {
    socket.on(socketAction.UPDATE_TABLE_SESSION, fetchTables);

    return () => {
      socket.off(socketAction.UPDATE_TABLE_SESSION, fetchTables);
    };
  }, []);

  return (
    <div
      className="h-screen overflow-auto"
      style={{
        background:
          "linear-gradient(109.6deg, rgb(255, 78, 80) 11.2%, rgb(249, 212, 35) 100.2%)",
      }}
    >
      <div className="max-w-[500px] mx-auto bg-white min-h-screen relative">
        <div className="header bg-[#fcf8f5]">
          <div className="container mx-auto px-2">
            <Flex justify="space-between" align="center" className="py-5">
              <img src="/logo.png" alt="" />
              <div>
                <Select
                  suffixIcon={
                    <FaSortDown className="text-[#e86a12] -translate-y-[3px]" />
                  }
                  className="custom-select"
                  defaultValue={tables?.[0]?._id}
                  size="large"
                  variant="borderless"
                  style={{ width: 100 }}
                  options={tables.map((item: Table) => ({
                    label: item.title,
                    value: item._id,
                    sessionKey: item.sessionKey,
                  }))}
                  onChange={(value, option) =>
                    //@ts-ignore
                    updateTableId(value, option?.sessionKey)
                  }
                  value={order.tableId}
                ></Select>
              </div>
            </Flex>
            <Space className="bg-[#fff1e6] text-[#e86a12] font-semibold w-full p-1 rounded-md">
              👋 Mời quý khách chọn món
            </Space>
            <CategorySlider
              onSelectCategory={setSelectedCategory}
              data={categories}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
        <div className="container mx-auto px-3">
          <FoodList
            onSelectFood={(food) =>
              orderBottomSheetRef.current?.handleOpen(food)
            }
            selectedCategory={selectedCategory}
          />
        </div>
        <OrderBottomSheetModal ref={orderBottomSheetRef} />
        <CartBottomSheet
          onSubmitOk={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <OrderDetailBtn />
      </div>
    </div>
  );
}
