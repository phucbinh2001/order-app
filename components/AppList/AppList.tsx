import { Dropdown } from "antd";
import Link from "next/link";
import React from "react";
import { TbGridDots } from "react-icons/tb";

const AppList = () => {
  return (
    <div className="absolute left-2 bottom-2 border border-[#efefef] rounded-xl">
      <Dropdown overlay={<LinkGrid />}>
        <div className="size-16 text-4xl bg-white shadow-lg rounded-xl flex items-center justify-center">
          <TbGridDots />
        </div>
      </Dropdown>
    </div>
  );
};

export default AppList;

const LinkGrid = () => {
  return (
    <div className="grid grid-cols-2 bg-white shadow-lg rounded-xl p-5 gap-5">
      <Link
        className="flex flex-col justify-center items-center font-semibold text-black"
        href={"/chef"}
      >
        <div className="size-28 rounded-3xl bg-gradient-to-r from-[#3b82f7] via-[#5274f2] to-[#6165ef] flex items-center justify-center">
          <img className="w-[100px]" src="/icons/chef-hat.png" />
        </div>
        <p className="mt-2">DS gọi món</p>
      </Link>
      <Link
        gap-5nk
        href={"/chef/tables"}
        className="flex flex-col justify-center items-center font-semibold text-black"
      >
        <div
          className="size-28 rounded-3xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(109.6deg, #661f20 11.2%, #662020 100.2%)",
          }}
        >
          <img className="w-[80px]" src="/icons/table.png" />
        </div>
        <p className="mt-2">Quản lý bàn ăn</p>
      </Link>
    </div>
  );
};
