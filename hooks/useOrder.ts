import { orderApi } from "@/api/order.api";
import { Order } from "@/types/order";
import { QueryParam } from "@/types/query";
import { useRef, useState } from "react";

export interface OrderQuery extends QueryParam {}

interface UseOrderProps {
  initQuery: OrderQuery;
}

export const useOrder = ({ initQuery }: UseOrderProps) => {
  const [data, setData] = useState<Order[]>([]);
  const query = useRef<OrderQuery>(initQuery);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await orderApi.findAll(query.current);

      setData(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    orders: data,
    fetchOrders: fetchData,
    loading,
    query: query.current,
  };
};
