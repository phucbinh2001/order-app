"use client";
import React, { useRef, useState } from "react";
import ScanOverlay from "./components/ScanOverlay";
import useOrderStore from "@/store/orderStore";
import { message } from "antd";
import Swal from "sweetalert2";

const Scanner = () => {
  const scannerRef = useRef<any>(null);
  const [visible, setVisible] = useState(true);
  const { updateTableId, tables } = useOrderStore((state) => state);
  const checkTable = (tableId: string) => {
    scannerRef.current.stop();
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
      setVisible(false);
    } else {
      message.error("Không tìm thấy bàn này" + tableId);
      console.log("tables", tables, tableId);
    }
  };

  if (!visible) return <></>;
  return (
    <QrReader
      //@ts-ignore
      ref={scannerRef}
      scanDelay={10000}
      className="scanner"
      onResult={(result, error) => {
        if (!!result) {
          checkTable(result.getText());
        }

        if (!!error) {
          console.info(error);
        }
      }}
      constraints={{ facingMode: "user", aspectRatio: 1 }}
      containerStyle={{
        width: "100vw",
        maxWidth: "500px",
        margin: "auto",
        aspectRatio: "1/1",
      }}
      ViewFinder={ScanOverlay}
    />
  );
};

export default Scanner;
