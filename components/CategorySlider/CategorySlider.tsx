import { Category } from "@/types/category";
import clsx from "clsx";
import React from "react";

const activeClass =
  "!border-orange-500 rounded-xl shadow-lg bg-white border text-black";

const CategorySlider = ({
  data,
  selectedCategory = data?.[0],
  onSelectCategory,
}: {
  data: Category[];
  selectedCategory?: Category;
  onSelectCategory: (category: Category) => void;
}) => {
  return (
    <div className="flex gap-4 py-6 px-4">
      {data?.map((item, index) => (
        <div
          onClick={() => onSelectCategory(item)}
          key={index}
          className={clsx(
            "flex flex-col items-center w-24 text-center gap-2 py-2 px-1 duration-300 cursor-pointer text-black/80 border border-transparent",
            selectedCategory?._id == item._id && activeClass
          )}
        >
          <img
            width={60}
            height={60}
            className="object-cover size-14 rounded-lg"
            src={item.image}
            alt=""
          />
          <span className="font-semibold">{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default CategorySlider;
