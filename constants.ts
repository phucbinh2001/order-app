import { FaBowlFood, FaChair, FaJarWheat, FaMoneyBill } from "react-icons/fa6";
import { IMenu } from "./types/menu";
import { Rule } from "antd/es/form";

export const adminMenu: IMenu[] = [
  { label: "Đơn hàng", path: "order", icon: FaMoneyBill },
  { label: "Món ăn", path: "food", icon: FaBowlFood },
  { label: "Danh mục", path: "category", icon: FaJarWheat },
  { label: "Bàn ghế", path: "table", icon: FaChair },
];

export const rules: Rule[] = [{ required: true }];
