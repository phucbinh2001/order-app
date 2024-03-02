import { FaBowlFood, FaChair, FaJarWheat } from "react-icons/fa6";
import { IMenu } from "./types/menu";

export const adminMenu: IMenu[] = [
  { label: "Món ăn", path: "food", icon: FaBowlFood },
  { label: "Danh mục", path: "category", icon: FaJarWheat },
  { label: "Bàn ghế", path: "table", icon: FaChair },
];
