import { OrderDetail, orderStatusTrans } from "@/types/order";
import { Space, Tag } from "antd";
import "./style/style.scss";

const OrderItem = ({ data }: { data: OrderDetail }) => {
  return (
    <div className={"rounded-lg mb-4"}>
      <Space key={data.foodId} className="w-full mb-3 last:mb-0" align="start">
        <img
          className="size-12 rounded-md mt-2"
          src={data.food.image || "https://placehold.co/50x50"}
        />
        <Space direction="vertical" size={1}>
          <p className="font-semibold">{data.food.title}</p>
          <span>Số lượng: {data.quantity}</span>
          <Tag
            color={orderStatusTrans[data.status].color}
            className="font-bold"
          >
            {orderStatusTrans[data.status].label}
          </Tag>
        </Space>
      </Space>
    </div>
  );
};

export default OrderItem;
