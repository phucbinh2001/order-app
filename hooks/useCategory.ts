import { categoryApi } from "@/api/category.api";
import { Category } from "@/types/category";
import { QueryParam } from "@/types/query";
import { useRef, useState } from "react";

export interface CategoryQuery extends QueryParam {}

interface UseCategoryProps {
  initQuery: CategoryQuery;
}

export const useCategory = ({ initQuery }: UseCategoryProps) => {
  const [data, setData] = useState<Category[]>([]);
  const query = useRef<CategoryQuery>(initQuery);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await categoryApi.findAll(query.current);

      setData(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    categories: data,
    fetchCategories: fetchData,
    loading,
    query: query.current,
  };
};
