"use client";
import TableGrid from "@/components/TableGrid/TableGrid";

export default function Tables() {
  return (
    <div className="grid grid-cols-12 h-screen bg-slate-300">
      <div className="col-span-12 p-3">
        <div className="wrapper bg-gradient-to-br h-full rounded-3xl p-5">
          <div className="header flex gap-2 items-center">
            <img width={150} src="/icons/table.png" alt="" />
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
  );
}
