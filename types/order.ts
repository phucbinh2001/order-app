import { Food } from "./food";
import { Table } from "./table";

export interface Order {
  _id: string;
  tableId: string;
  table: Table;
  totalMoney: number;
  status: any;
  orderDetails: OrderDetail[];
  createdAt: number;
}

export interface OrderDetail {
  foodId: string;
  food: Food;
  quantity: number;
  price: number;
  note: string;
}
