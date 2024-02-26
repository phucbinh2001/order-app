import useOrderStore from "@/store/orderStore";
import { Order } from "@/types/order";
import { useMemo, useRef } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import OrderCard from "../OrderCard/OrderCard";

import { Responsive, WidthProvider } from "react-grid-layout";
import { getGridItemPosition } from "@/utils/grid";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const OrderList = ({ orders }: { orders: Order[] }) => {
  const setSelectedOrder = useOrderStore((state) => state.setSelectedOrder);
  const draggableContainerRef = useRef(null);
  const selectedOrder = useOrderStore((state) => state.selectedOrder);

  const layout = useMemo(
    () =>
      orders.map((item, index) => {
        const { x, y } = getGridItemPosition(index);
        return {
          i: item._id,
          x,
          y,
          w: 1,
          h: 4,
        };
      }),
    [orders]
  );

  console.log({ layout });

  return (
    <div
      ref={draggableContainerRef}
      className="order-list bg-[#4e4cb8] rounded-2xl p-4"
    >
      {orders.length > 0 && (
        <ResponsiveReactGridLayout
          autoSize={true}
          style={{
            width: "100%",
            minHeight: "100vh",
            backgroundSize: "100% 100%",
            overflow: "hidden",
          }}
          breakpoints={{ lg: 1200 }}
          cols={{ lg: 4 }}
          rowHeight={50}
          width={1108}
          layouts={{ lg: layout }}
          isResizable={false}
          draggableHandle=".drag-handle"
        >
          {orders.map((item, index) => (
            <div key={item._id} onClick={() => setSelectedOrder(item)}>
              <OrderCard
                active={item._id == selectedOrder?._id}
                order={item}
                key={index}
              />
            </div>
          ))}
        </ResponsiveReactGridLayout>
      )}
    </div>
  );
};

export default OrderList;
