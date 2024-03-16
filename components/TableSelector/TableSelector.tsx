import { tableApi } from "@/api/table.api";
import { socketAction } from "@/constants";
import useOrderStore from "@/store/orderStore";
import { Table } from "@/types/table";
import { socket } from "@/utils/socket";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa6";
import { MdTableRestaurant } from "react-icons/md";

const TableSelector = () => {
  const order = useOrderStore((state) => state.order);
  const { updateTableId, fetchTables, tables } = useOrderStore(
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

  // const fetchTables = async () => {
  //   const { data: tableData } = await tableApi.findAll();
  //   setTables(tableData);

  //   const selectedTableId = order.tableId;
  //   if (selectedTableId) {
  //     const find = tableData.find((item: Table) => item._id == selectedTableId);
  //     if (find) {
  //       updateTableId(find._id, find.sessionKey);
  //     }
  //   } else {
  //     updateTableId(tableData?.[0]?._id, tableData?.[0]?.sessionKey);
  //   }
  // };

  return (
    <>
      <div className="flex items-center bg-[#fff1e6] rounded-md pl-2">
        <MdTableRestaurant className="text-[#e86a12] mr-2" />
        <Select
          suffixIcon={
            <FaSortDown className="text-[#e86a12] -translate-y-[3px]" />
          }
          className="custom-select"
          defaultValue={tables?.[0]?._id}
          size="large"
          variant="borderless"
          style={{ width: "max-content", maxWidth: "100px" }}
          options={tables.map((item: Table) => ({
            label: item.title,
            value: item._id,
            sessionKey: item.sessionKey,
          }))}
          onChange={(value, option) =>
            //@ts-ignore
            updateTableId(value, option?.sessionKey)
          }
          value={order.tableId}
        ></Select>
      </div>
    </>
  );
};

export default TableSelector;
