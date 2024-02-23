import { Food } from "./food";

export interface Order {
  tableId: string;
  totalMoney: number;
  status: any;
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  foodId: string;
  food: Food;
  quantity: number;
  price: number;
  note: string;
}
