export interface User {
  createdAt: number;
  isDeleted: boolean;
  name: string;
  password: string;
  role: UserRole;
  updatedAt: number;
  username: string;
  _id: string;
}

export enum UserRole {
  admin = "ADMIN",
  chef = "CHEF",
}

export const roleOptions = [
  { value: UserRole.admin, label: "Quản trị viên" },
  { value: UserRole.chef, label: "Đầu bếp" },
];

export const roleTrans = {
  [UserRole.admin]: { label: "Quản trị viên", color: "blue" },
  [UserRole.chef]: { label: "Đầu bếp", color: "orange" },
};
