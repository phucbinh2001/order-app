"use client";
import { categoryApi } from "@/api/category.api";
import { tableApi } from "@/api/table.api";
import { CartBottomSheet } from "@/components/CartBottomSheet/CartBottomSheet";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import FoodList from "@/components/FoodList/FoodList";
import {
  OrderBottomSheetModal,
  OrderBottomSheetRef,
} from "@/components/OrderBottomSheet/OrderBottomSheet";
import OrderDetailBtn from "@/components/OrderDetailBtn/OrderDetailBtn";
import useOrderStore from "@/store/orderStore";
import { Category } from "@/types/category";
import { Table } from "@/types/table";
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
    const { data: tableData } = await tableApi.findAll();
    setTables(tableData);
    updateTableId(tableData?.[0]?._id);
    setCategories(data);
    setSelectedCategory(data?.[0]);
  };

  return (
    <>
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
                }))}
                onChange={(value) => updateTableId(value)}
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
          onSelectFood={(food) => orderBottomSheetRef.current?.handleOpen(food)}
          selectedCategory={selectedCategory}
        />
      </div>
      <OrderBottomSheetModal
        ref={orderBottomSheetRef}
        onSubmitOk={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <CartBottomSheet
        onSubmitOk={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <OrderDetailBtn />
    </>
  );
}
