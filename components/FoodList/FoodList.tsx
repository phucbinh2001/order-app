"use client";
import { foodApi } from "@/api/food.api";
import { Category } from "@/types/category2";
import { Food } from "@/types/food2";
import { formatMoney } from "@/utils/money";
import { Flex } from "antd";
import Item from "antd/es/list/Item";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const FoodList = ({
  selectedCategory,
  onSelectFood,
}: {
  selectedCategory: Category;
  onSelectFood: (food: Food) => void;
}) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    if (selectedCategory?._id) {
      fetchData();
    }
  }, [selectedCategory]);

  const fetchData = async () => {
    const { data } = await foodApi.findAll({
      categoryId: selectedCategory._id,
    });
    setFoods(data);
  };

  return (
    <div className="mt-5">
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
    <div className="flex rounded-xl mb-3 overflow-hidden ">
      <img
        className="aspect-square rounded-xl object-cover"
        width={100}
        height={100}
        src={data.image}
      />
      <div className="flex flex-col w-full p-2 ml-2 relative">
        <h2 className="text-xl font-semibold">{data.title}</h2>
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
            className="absolute bottom-0 right-0 rounded-tl-xl px-4 flex gap-2 items-center cursor-pointer py-2  bg-[#e86a12] text-white font-semibold"
          >
            <FaPlus /> Thêm
          </div>
        </Flex>
      </div>
    </div>
  );
};
