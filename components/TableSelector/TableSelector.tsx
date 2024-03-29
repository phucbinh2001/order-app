"use client";
import { deviceApi } from "@/api/device.api";
import { socketAction } from "@/constants";
import useOrderStore from "@/store/orderStore";
import { Table } from "@/types/table";
import { getDeviceId } from "@/utils/deviceId";
import { socket } from "@/utils/socket";
import { Select, Space } from "antd";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineScan } from "react-icons/ai";
import { MdTableRestaurant } from "react-icons/md";
import OneSignal from "react-onesignal";

const TableSelector = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const order = useOrderStore((state) => state.order);
  const { updateTableId, fetchTables, tables, setVisibleScan } = useOrderStore(
    (state) => state
  );

  useEffect(() => {
    socket.on(socketAction.UPDATE_TABLE_SESSION, fetchTables);

    return () => {
      socket.off(socketAction.UPDATE_TABLE_SESSION, fetchTables);
    };
  }, []);

  useEffect(() => {
    fetchTables();
  }, []);

  useEffect(() => {
    const tableId = searchParams.get("table");
    if (!tables.length || !tableId) return;
    const find = tables.find((item) => item._id == searchParams.get("table"));
    if (find) {
      updateTableId(find._id, find.sessionKey);
    }
    //clear search param
    const url = new URL(window.location.href);
    url.searchParams.delete("table");
    router.push(url.toString());
  }, [tables]);

  const onChangeTable = (tableId: string, tableSessionKey: string) => {
    updateTableId(tableId, tableSessionKey);
    // deviceApi.update({ tableId, deviceId: getDeviceId() });
    OneSignal.User.addTag("table", tableSessionKey);
  };

  return (
    <Space>
      <div
        className=" bg-[#fff1e6] rounded-md size-[40px] flex items-center justify-center"
        onClick={() => setVisibleScan(true)}
      >
        <AiOutlineScan className="text-[#e86a12] text-xl" />
      </div>
      <div className="flex items-center bg-[#fff1e6] rounded-md pl-2">
        <MdTableRestaurant className={clsx(`text-[#e86a12] mr-2`)} />
        <Select
          popupMatchSelectWidth={false}
          suffixIcon={null}
          placeholder={"Chọn bàn"}
          className="custom-select"
          size="large"
          variant="borderless"
          style={{ width: "max-content", minWidth: "", maxWidth: "100px" }}
          options={tables.map((item: Table) => ({
            label: item.title,
            value: item._id,
            sessionKey: item.sessionKey,
          }))}
          onChange={(value, option) =>
            //@ts-ignore
            onChangeTable(value, option?.sessionKey)
          }
          value={order.tableId}
        ></Select>
      </div>
    </Space>
  );
};

export default TableSelector;
