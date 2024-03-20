"use client";
import useOrderStore from "@/store/orderStore";
import { getSearchParam } from "@/utils/string";
import { CloseCircleFilled } from "@ant-design/icons";
import { Space, message } from "antd";
import clsx from "clsx";
import { useRef, useState } from "react";
import QrReader from "react-qr-reader";
import Swal from "sweetalert2";

const Scanner = () => {
  const scannerRef = useRef<any>(null);
  const { updateTableId, tables, visibleScan, setVisibleScan } = useOrderStore(
    (state) => state
  );
  const [loaded, setLoaded] = useState(false);
  const checkTable = (link: string) => {
    const tableId = getSearchParam(link, "table");
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
    }
  };

  return (
    <div
      className={clsx(
        visibleScan ? "size-[100vw] max-w-[500px] max-h-[500px]" : "size-0",
        "duration-300 relative mx-auto"
      )}
    >
      {visibleScan ? (
        <div
          className={clsx("opacity-0 duration-200", loaded && "opacity-100")}
        >
          <CloseCircleFilled
            onClick={() => {
              setVisibleScan(false);
              setLoaded(false);
            }}
            className="!text-white absolute text-2xl right-3 top-3 z-50"
          />
          <div className="absolute bottom-2  left-0 z-50 flex w-full justify-center">
            <Space className="bg-[#fff1e6]/80 text-[#e86a12] font-semibold p-1 rounded-md w-fit backdrop-blur-sm">
              🔎 Quét mã QR tại bàn của bạn
            </Space>
          </div>
          <QrReader
            onLoad={() => setLoaded(true)}
            ref={scannerRef}
            delay={300}
            className="scanner"
            onScan={(result) => {
              if (!!result) {
                checkTable(result);
              }
            }}
            onError={() => {
              message.config({ maxCount: 1 });
              message.warning("Vui lòng cho phép quyền truy cập camera");
              setVisibleScan(false);
            }}
            facingMode="environment"
            style={{
              width: "100vw",
              maxWidth: "500px",
              margin: "auto",
              aspectRatio: "1/1",
            }}
            showViewFinder
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Scanner;
