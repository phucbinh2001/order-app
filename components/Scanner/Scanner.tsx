"use client";
import useOrderStore from "@/store/orderStore";
import { message } from "antd";
import { useRef, useState } from "react";
import QrReader from "react-qr-reader";
import Swal from "sweetalert2";

const Scanner = () => {
  const scannerRef = useRef<any>(null);
  const [visible, setVisible] = useState(true);
  const { updateTableId, tables } = useOrderStore((state) => state);
  const checkTable = (tableId: string) => {
    // scannerRef.current.stop();
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
      ref={scannerRef}
      delay={5000}
      className="scanner"
      onScan={(result) => {
        if (!!result) {
          checkTable(result);
        }
      }}
      onError={() => ""}
      facingMode="user"
      style={{
        width: "100vw",
        maxWidth: "500px",
        margin: "auto",
        aspectRatio: "1/1",
      }}
      showViewFinder
    />
  );
};

export default Scanner;
