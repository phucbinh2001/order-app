import { Category } from "@/types/category";
import clsx from "clsx";
import React from "react";

const activeClass = "!border-orange-500 shadow-lg bg-white border text-black";

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
    <div className="py-3 pb-4 container gap-2 mx-auto overflow-x-auto hidden-scrollbar justify-start flex sticky top-32">
      {data?.map((item, index) => (
        <div
          onClick={() => onSelectCategory(item)}
          key={index}
          className={clsx(
            "flex flex-col float-left items-center rounded-xl min-w-24 text-center gap-2 py-2 px-1 duration-300 cursor-pointer text-black/80 border border-transparent",
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
          <span className="font-semibold text-sm">{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default CategorySlider;
