import useOrderStore from "@/store/orderStore";
import { Button, Modal, Result } from "antd";
import React, { useImperativeHandle, useState } from "react";
import { AiOutlineScan } from "react-icons/ai";

export interface CTAScanQRModalRef {
  handleOpen: () => void;
}

export const CTAScanQRModal = React.forwardRef(({}: {}, ref) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const setVisibleScan = useOrderStore((state) => state.setVisibleScan);

  useImperativeHandle(
    ref,
    () => {
      return {
        handleOpen() {
          setVisibleModal(true);
        },
      };
    },
    []
  );

  return (
    <Modal
      styles={{ content: { padding: 0 } }}
      centered
      onCancel={() => setVisibleModal(false)}
      open={visibleModal}
      footer={false}
    >
      <Result
        style={{ padding: 20 }}
        icon={
          <div className="flex justify-center">
            <img className="w-[150px]" src="/icons/dinner-table.png" />
          </div>
        }
        title="Bạn chưa chọn bàn"
        subTitle={
          <p className="text-base">
            Hãy quét mã QR tại bàn ăn của bạn <br /> để chọn bàn nhé!
          </p>
        }
        extra={
          <div
            onClick={() => {
              setVisibleScan(true);
              setVisibleModal(false);
            }}
            className="cursor-pointer max-h-[56px] py-4 px-5 bg-gradient-to-b from-[#ff9114] to-[#ff6b04] rounded-lg flex items-center w-full text-base !font-semibold text-white gap-2 justify-center"
          >
            <AiOutlineScan className="text-2xl" /> Quét mã QR
          </div>
        }
      />
    </Modal>
  );
});
