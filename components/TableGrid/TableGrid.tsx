import React, { useEffect, useRef } from "react";
import Table from "../Table/Table";
import { useTable } from "@/hooks/useTable";
import {
  TableDetailModal,
  TableDetailModalRef,
} from "../Table/components/TableDetailModal";
import { socket } from "@/utils/socket";
import { socketAction } from "@/constants";

const TableGrid = () => {
  const tableDetailModalRef = useRef<TableDetailModalRef>();
  const { getSummary, summary } = useTable({ initQuery: {} });

  useEffect(() => {
    getSummary();
  }, []);

  useEffect(() => {
    socket.on(socketAction.NEW_ORDER, getSummary);
    socket.on(socketAction.UPDATE_ORDER_DETAIL_STATUS, getSummary);

    return () => {
      socket.off(socketAction.UPDATE_ORDER_DETAIL_STATUS, getSummary);
      socket.off(socketAction.NEW_ORDER, getSummary);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-5 gap-y-5">
        {summary.map((item, key) => (
          <div className="flex justify-center" key={key}>
            <Table
              key={item.sessionKey}
              data={item}
              onClick={() => {
                if (item.startAt) {
                  tableDetailModalRef.current?.handleOpen(item);
                }
              }}
            />
          </div>
        ))}
      </div>
      <TableDetailModal ref={tableDetailModalRef} onSubmitOk={getSummary} />
    </>
  );
};

export default TableGrid;
