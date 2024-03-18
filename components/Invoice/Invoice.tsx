import { orderApi } from "@/api/order.api";
import { tableApi } from "@/api/table.api";
import { Order, OrderStatusEnum } from "@/types/order";
import { formatUnixTimestamp } from "@/utils/date";
import { formatMoney } from "@/utils/money";
import { Button, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const Invoice = ({
  order,
  onAfterPrint,
}: {
  order: Order;
  onAfterPrint: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => onAfterPrint(),
  });

  const completeOrder = async () => {
    try {
      setLoading(true);
      await orderApi.updateStatus(order?.orderCode, OrderStatusEnum.complete);
      await tableApi.updateSession(order.table._id);
      handlePrint();
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Popconfirm
        title={<p className="text-base">Xác nhận thanh toán cho bàn này?</p>}
        onConfirm={() => completeOrder()}
        okText={"Xác nhận thanh toán"}
        cancelText={"Hủy"}
        cancelButtonProps={{ size: "large" }}
        okButtonProps={{ size: "large" }}
      >
        <Button loading={loading} block type="primary" size="large">
          Thanh toán
        </Button>
      </Popconfirm>

      <div style={{ display: "none" }}>
        <div
          className="bg-white p-2 max-w-xl mx-auto text-xs"
          ref={componentRef}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-700">
              <div className="font-bold text-xl mb-2">INVOICE</div>
              <div className="text-xs">
                Ngày: {formatUnixTimestamp(dayjs().unix(), "DD/MM/YYYY")}
              </div>
              <div className="text-xs">
                Hóa đơn: #{order?.orderCode?.toUpperCase()}
              </div>
              <div className="text-xs">{order?.table?.title}</div>
            </div>
            <div className="flex items-center">
              <img className="h-8 w-8 mr-2" src="/logo.png" alt="Logo" />
            </div>
          </div>
          <table className="w-full text-left mb-2 pb-2 text-xs">
            <tbody>
              {order?.orderDetails
                .filter((item) =>
                  [OrderStatusEnum.complete, OrderStatusEnum.pending].includes(
                    item.status
                  )
                )
                ?.map((item) => (
                  <tr>
                    <td className="text-gray-700 align-bottom">
                      {item.food.title} <br />x{item.quantity}
                    </td>
                    <td className="text-gray-700 text-right align-bottom">
                      {formatMoney(item.price)}đ
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-between border-t pt-2 border-dashed">
            <div className="text-gray-700 mr-2">Tổng tiền:</div>
            <div className="text-gray-700 font-bold text-sm">
              {formatMoney(order.totalMoney)}đ
            </div>
          </div>
          <div className="border-t border-gray-300 mt-1 pt-1">
            <div className="text-gray-700 mb-2 text-center">
              Cảm ơn và hẹn gặp lại quý khách!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
