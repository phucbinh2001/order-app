import useOrderStore from "@/store/orderStore";
import { Order } from "@/types/order";
import { useCallback, useMemo, useRef } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import OrderCard from "../OrderCard/OrderCard";

import ReactGridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import { getGridItemPosition } from "@/utils/grid";
import { orderApi } from "@/api/order.api";
import { debounce } from "lodash";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const OrderList = ({ orders }: { orders: Order[] }) => {
  const layoutPositionIds = useRef<string[]>([]);
  const setSelectedOrder = useOrderStore((state) => state.setSelectedOrder);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);
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
          h: 1,
        };
      }),
    [orders]
  );

  const onLayoutChange = (layout: ReactGridLayout.Layout[]) => {
    const sortedLayout = layout.sort((a, b) => {
      if (a.y === b.y) {
        return b.x - a.x; // Sắp xếp theo x lớn nhất nếu y bằng nhau
      }
      return b.y - a.y; // Sắp xếp theo y lớn nhất
    });
    layoutPositionIds.current = sortedLayout.map((item) => item.i);
    debounceUpdatePosition(layoutPositionIds.current);
  };

  const debounceUpdatePosition = useCallback(
    debounce((ids) => orderApi.updatePosition({ ids }), 3000),
    []
  );

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
          rowHeight={270}
          layouts={{ lg: layout }}
          isResizable={false}
          draggableHandle=".drag-handle"
          onLayoutChange={onLayoutChange}
          compactType={"horizontal"}
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
