import {
  FaBowlFood,
  FaChair,
  FaJarWheat,
  FaMoneyBill,
  FaUser,
} from "react-icons/fa6";
import { IMenu } from "./types/menu";
import { Rule } from "antd/es/form";

export const adminMenu: IMenu[] = [
  { label: "Đơn hàng", path: "order", icon: FaMoneyBill },
  { label: "Món ăn", path: "food", icon: FaBowlFood },
  { label: "Danh mục", path: "category", icon: FaJarWheat },
  { label: "Bàn ăn", path: "table", icon: FaChair },
  { label: "Nhân viên", path: "staff", icon: FaUser },
];

export const rules: Rule[] = [{ required: true }];

export const socketAction = {
  JOIN: "join",
  LEAVE: "leave",
  NEW_ORDER: "new-order",
  UPDATE_ORDER_STATUS: "update-order-status",
  UPDATE_TABLE_SESSION: "update-table-session",
};
