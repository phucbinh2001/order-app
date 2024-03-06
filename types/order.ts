import { Food } from "./food";
import { Table } from "./table";

export interface Order {
  _id: string;
  tableId: string;
  sessionKey: string;
  table: Table;
  totalMoney: number;
  status: OrderStatusEnum;
  orderDetails: OrderDetail[];
  createdAt: number;
  orderCode: string;
}

export interface OrderDetail {
  _id: string;
  foodId: string;
  food: Food;
  quantity: number;
  price: number;
  note: string;
  status: OrderStatusEnum;
}

export enum OrderStatusEnum {
  complete = "COMPLETE",
  cancel = "CANCEL",
  outOfStock = "OUT_OF_STOCK",
  pending = "PENDING",
}

export const orderStatusTrans = {
  [OrderStatusEnum.complete]: {
    label: "Đã xong",
    color: "green-inverse",
    badgeColor: "green",
  },
  [OrderStatusEnum.pending]: {
    label: "Đang chờ nấu",
    color: "blue-inverse",
    badgeColor: "blue",
  },
  [OrderStatusEnum.cancel]: {
    label: "Đã hủy",
    color: "red-inverse",
    badgeColor: "red",
  },
  [OrderStatusEnum.outOfStock]: {
    label: "Tạm hết",
    color: "orange",
    badgeColor: "orange",
  },
};
