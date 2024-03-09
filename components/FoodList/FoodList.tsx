"use client";
import { foodApi } from "@/api/food.api";
import { Category } from "@/types/category";
import { Food } from "@/types/food";
import { formatMoney } from "@/utils/money";
import { Flex } from "antd";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import FoodListSkeleton from "./components/FoodListSkeleton";

const FoodList = ({
  selectedCategory,
  onSelectFood,
}: {
  selectedCategory: Category;
  onSelectFood: (food: Food) => void;
}) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCategory?._id) {
      fetchData();
    }
  }, [selectedCategory]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await foodApi.findAll({
        categoryId: selectedCategory._id,
      });
      setFoods(data);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <FoodListSkeleton />;
  return (
    <div className="mt-1 pb-5 divide-y divide-[#efefef]">
      {foods.map((item: Food) => (
        <FoodItem onSelectFood={onSelectFood} key={item._id} data={item} />
      ))}
    </div>
  );
};

export default FoodList;

const FoodItem = ({
  data,
  onSelectFood,
}: {
  data: Food;
  onSelectFood: (food: Food) => void;
}) => {
  return (
    <div className="flex overflow-hidden py-3">
      <img
        className="aspect-square rounded-lg object-cover"
        width={100}
        height={100}
        src={data.image}
      />
      <div className="flex flex-col w-full p-1 ml-2 relative">
        <h2 className="text-lg font-normal">{data.title}</h2>
        <p>{data.description}</p>
        <Flex
          justify="space-between"
          align="center"
          className="mt-auto"
          style={{ width: "100%" }}
        >
          <span className="font-semibold text-sm">
            {formatMoney(data.price)}đ
          </span>
          <div
            onClick={() => onSelectFood(data)}
            className="size-10 flex items-center justify-center absolute bottom-0 right-0 gap-2 cursor-pointer bg-[#e86a12] text-white font-semibold rounded-lg"
          >
            <FaPlus />
          </div>
        </Flex>
      </div>
    </div>
  );
};
