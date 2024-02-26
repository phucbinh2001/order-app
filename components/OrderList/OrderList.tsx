import useOrderStore from "@/store/orderStore";
import { Order } from "@/types/order";
import GridLayout from "react-grid-layout";
import OrderCard from "../OrderCard/OrderCard";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const OrderList = ({ orders }: { orders: Order[] }) => {
  const setSelectedOrder = useOrderStore((state) => state.setSelectedOrder);
  const selectedOrder = useOrderStore((state) => state.selectedOrder);
  const layout = [
    { i: "65daafc3d6090135a72881f7", x: 0, y: 0, w: 1, h: 4, autoSize: true },
    { i: "65daad70dce3f89f58574753", x: 1, y: 0, w: 1, h: 4, autoSize: true },
  ];
  return (
    <div className="order-list bg-[#4e4cb8] rounded-2xl p-4">
      {orders.length > 0 && (
        <GridLayout
          autoSize={true}
          style={{
            width: "100%",
            minHeight: "100vh",
            backgroundSize: "100% 100%",
            overflow: "hidden",
          }}
          cols={4}
          rowHeight={50}
          width={1200}
          layout={layout}
          isResizable={false}
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
        </GridLayout>
      )}
    </div>
  );
};

export default OrderList;
