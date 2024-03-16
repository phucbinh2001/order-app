"use client";
import { categoryApi } from "@/api/category.api";
import BottomButtons from "@/components/BottomButtons/BottomButtons";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import FoodList from "@/components/FoodList/FoodList";
import OrderBottomSheetModal, {
  OrderBottomSheetRef,
} from "@/components/OrderBottomSheet/OrderBottomSheet";
import Scanner from "@/components/Scanner/Scanner";
import TableSelector from "@/components/TableSelector/TableSelector";
import { Category } from "@/types/category";
import { Flex, Space } from "antd";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories?.[0]
  );

  const orderBottomSheetRef = useRef<OrderBottomSheetRef>();

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const { data } = await categoryApi.findAll();
    setCategories(data);
    setSelectedCategory(data?.[0]);
  };

  return (
    <div
      className="h-screen overflow-auto"
      style={{
        background:
          "linear-gradient(109.6deg, rgb(255, 78, 80) 11.2%, rgb(249, 212, 35) 100.2%)",
      }}
    >
      <Scanner />
      <div className="max-w-[500px] mx-auto bg-white min-h-screen relative pb-28">
        <div className="header bg-[#fcf8f5] z-10 sticky top-0">
          <div className="container mx-auto px-2">
            <Flex justify="space-between" align="center" className="py-2">
              <img src="/logo.png" alt="" className="size-14 rounded-xl" />
              <TableSelector />
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

        {/* <OrderDetailBtn /> */}
        <BottomButtons />
      </div>
    </div>
  );
}
