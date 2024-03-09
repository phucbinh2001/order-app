import React, { useEffect, useRef } from "react";
import Table from "../Table/Table";
import { useTable } from "@/hooks/useTable";
import {
  TableDetailModal,
  TableDetailModalRef,
} from "../Table/components/TableDetailModal";
import { socket } from "@/utils/socket";

const TableGrid = () => {
  const tableDetailModalRef = useRef<TableDetailModalRef>();
  const { getSummary, summary } = useTable({ initQuery: {} });

  useEffect(() => {
    getSummary();
  }, []);

  useEffect(() => {
    function onNewOrder(data: any) {
      console.log("new-order", data);
      getSummary();
    }

    socket.on("new-order", onNewOrder);

    return () => {
      socket.off("new-order", onNewOrder);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-6">
        {summary.map((item, key) => (
          <Table
            type={1}
            key={key}
            data={item}
            onClick={() => {
              if (item.startAt) {
                tableDetailModalRef.current?.handleOpen(item);
              }
            }}
          />
        ))}
      </div>
      <TableDetailModal ref={tableDetailModalRef} onSubmitOk={getSummary} />
    </>
  );
};

export default TableGrid;
