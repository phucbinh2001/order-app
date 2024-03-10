import useOrderStore from "@/store/orderStore";
import { Drawer } from "antd";
import OrderDetail from "./OrderDetail";

const OrderDetailDrawer = () => {
  const { visibleOrderDetailModal, setVisibleOrderDetail } = useOrderStore(
    (state) => state
  );

  return (
    <Drawer
      onClose={() => setVisibleOrderDetail(false)}
      title={null}
      closable={false}
      width={450}
      open={visibleOrderDetailModal}
      styles={{ body: { padding: 10, paddingTop: 0, paddingBottom: 0 } }}
    >
      <OrderDetail />
    </Drawer>
  );
};

export default OrderDetailDrawer;
