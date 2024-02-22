"use client";
import { categoryApi } from "@/api/category.api";
import { tableApi } from "@/api/table.api";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import FoodList from "@/components/FoodList/FoodList";
import { Category } from "@/types/Category";
import { Table } from "@/types/Table";
import { Flex, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { FaArrowDown, FaSortDown } from "react-icons/fa6";

async function getCategory() {
  const { data } = await categoryApi.findAll();

  if (!data) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

async function getTable() {
  const { data } = await tableApi.findAll();

  if (!data) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories?.[0]
  );
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const tables = await getTable();
    const categories = await getCategory();
    setTables(tables);
    setCategories(categories);
    setSelectedCategory(categories?.[0]);
  };

  return (
    <>
      <div className="header bg-[#fcf8f5]">
        <div className="container mx-auto px-2">
          <Flex justify="space-between" align="center" className="py-5">
            <img src="/logo.png" alt="" />
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
            ></Select>
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
      <div className="container mx-auto px-2">
        <FoodList selectedCategory={selectedCategory} />
      </div>
    </>
  );
}
