export interface Category {
  _id: string;
  title: string;
  description: string;
  slug: string;
  position: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  image: string;
}
