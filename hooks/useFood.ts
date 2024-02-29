import { foodApi } from "@/api/food.api";
import { Food } from "@/types/food";
import { QueryParam } from "@/types/query";
import { useRef, useState } from "react";

export interface FoodQuery extends QueryParam {}

interface UseCompanyProps {
  initQuery: FoodQuery;
}

export const useFood = ({ initQuery }: UseCompanyProps) => {
  const [data, setData] = useState<Food[]>([]);
  const query = useRef<FoodQuery>(initQuery);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await foodApi.findAll(query.current);

      setData(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    foods: data,
    fetchFoods: fetchData,
    loading,
    query: query.current,
  };
};
