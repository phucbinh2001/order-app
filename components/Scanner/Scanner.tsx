"use client";
import useOrderStore from "@/store/orderStore";
import { CloseCircleFilled } from "@ant-design/icons";
import { message } from "antd";
import clsx from "clsx";
import { useRef, useState } from "react";
import QrReader from "react-qr-reader";
import Swal from "sweetalert2";

const Scanner = () => {
  const scannerRef = useRef<any>(null);
  const { updateTableId, tables, visibleScan, setVisibleScan } = useOrderStore(
    (state) => state
  );
  const checkTable = (tableId: string) => {
    const find = tables.find((item) => item._id == tableId);
    if (find) {
      Swal.fire({
        customClass: "custom-notification",
        position: "top",
        icon: "success",
        width: 157,
        showConfirmButton: false,
        timer: 1000,
        backdrop: "rgba(0,0,0,0.2)",
        title: find.title,
      });
      updateTableId(find._id, find.sessionKey);
      setVisibleScan(false);
    } else {
      message.error("Không tìm thấy bàn này" + tableId);
      console.log("tables", tables, tableId);
    }
  };

  return (
    <div
      className={clsx(visibleScan ? "size-[100vw]" : "size-0", "duration-300")}
    >
      {visibleScan ? (
        <>
          <CloseCircleFilled
            onClick={() => setVisibleScan(false)}
            className="!text-white absolute text-2xl right-3 top-3 z-50"
          />
          <QrReader
            ref={scannerRef}
            delay={5000}
            className="scanner"
            onScan={(result) => {
              if (!!result) {
                checkTable(result);
              }
            }}
            onError={() => ""}
            facingMode="environment"
            style={{
              width: "100vw",
              maxWidth: "500px",
              margin: "auto",
              aspectRatio: "1/1",
            }}
            showViewFinder
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Scanner;
