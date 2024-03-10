"use client";
import TableGrid from "@/components/TableGrid/TableGrid";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

export default function Tables() {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    router.push("/login/chef");
  };

  return (
    <div
      className="p-4 h-svh"
      style={{
        background:
          "linear-gradient(109.6deg, rgb(255, 78, 80) 11.2%, rgb(249, 212, 35) 100.2%)",
      }}
    >
      <div className="grid h-full bg-black/60 backdrop-blur-lg rounded-3xl">
        <div className="p-3">
          <div className="wrapper bg-gradient-to-br h-full rounded-3xl p-5">
            <div className="header flex gap-10 items-center mb-10">
              <img width={150} src="/icons/table.png" alt="" />
              <div className="text-white">
                <h2 className="font-bold text-xl mb-2 flex">
                  Xin chào!{" "}
                  <div
                    onClick={handleLogout}
                    className="flex items-center text-yellow-500 text-base ml-3 gap-1 cursor-pointer group font-normal hover:bg-yellow-200 hover:text-yellow-900 duration-300 rounded-md px-3"
                  >
                    <FaSignOutAlt /> <span>Đăng xuất</span>
                  </div>
                </h2>
                <p className="text-3xl font-light">Quản lý bàn ăn</p>
              </div>
            </div>

            <TableGrid />
          </div>
        </div>
        <div className="absolute bottom-5 right-5">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-orange-500"></div> Đang ăn
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-white"></div> Trống
          </div>
        </div>
      </div>
    </div>
  );
}
