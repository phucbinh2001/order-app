export interface Order {
  tableId: string;
  totalMoney: number;
  status: any;
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  foodId: string;
  quantity: number;
  price: number;
  note: string;
}
