import { Order } from "@/types/order";
import { useCallback, useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import OrderDetailItem from "./OrderDetailItem";
import { debounce } from "lodash";
import { orderDetailApi } from "@/api/orderDetail.api";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const OrderDetailList = ({
  order,
  onFetchDetail,
}: {
  order: Order;
  onFetchDetail: () => void;
}) => {
  const layout = useMemo(
    () =>
      order?.orderDetails?.map((item, index) => {
        return {
          i: item._id,
          x: 1,
          y: index,
          w: 1,
          h: 1,
        };
      }),
    [order]
  );

  const onLayoutChange = (layout: ReactGridLayout.Layout[]) => {
    const sortedLayout = layout.sort((a, b) => {
      return b.y - a.y; // Sắp xếp theo y lớn nhất
    });
    debounceUpdatePosition(sortedLayout.map((item) => item.i));
  };

  const debounceUpdatePosition = useCallback(
    debounce((ids) => orderDetailApi.updatePosition({ ids }), 3000),
    []
  );

  return (
    <ResponsiveReactGridLayout
      autoSize={true}
      style={{
        width: "100%",
        minHeight: "calc(100vh - 210px)",
        backgroundSize: "100% 100%",
        overflow: "hidden",
      }}
      breakpoints={{ lg: 1200 }}
      cols={{ lg: 1 }}
      rowHeight={80}
      layouts={{ lg: layout }}
      isResizable={false}
      draggableHandle=".drag-handle"
      onLayoutChange={onLayoutChange}
    >
      {order?.orderDetails?.map((item) => (
        <div key={item._id}>
          <OrderDetailItem
            orderDetail={item}
            order={order}
            onFetchDetail={onFetchDetail}
          />
        </div>
      ))}
    </ResponsiveReactGridLayout>
  );
};

export default OrderDetailList;
