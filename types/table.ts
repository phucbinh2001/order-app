import { OrderDetail } from "./order";

export interface Table {
  title: string;
  _id: string;
  sessionKey: string;
}

export interface TableSummary {
  _id: string;
  sessionKey: string;
  startAt: number;
  title: string;
  orderDetails: OrderDetail[];
}
