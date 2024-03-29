import { tableApi } from "@/api/table.api";
import { QueryParam } from "@/types/query";
import { Table, TableSummary } from "@/types/table";
import { useRef, useState } from "react";

export interface TableQuery extends QueryParam {}

interface UseTableProps {
  initQuery: TableQuery;
}

export const useTable = ({ initQuery }: UseTableProps) => {
  const [data, setData] = useState<Table[]>([]);
  const [summary, setSummary] = useState<TableSummary[]>([]);
  const query = useRef<TableQuery>(initQuery);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await tableApi.findAll(query.current);

      setData(data);
    } finally {
      setLoading(false);
    }
  };

  const getSummary = async () => {
    setLoading(true);
    try {
      const { data } = await tableApi.summary();

      setSummary(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    tables: data,
    fetchTable: fetchData,
    loading,
    query: query.current,
    getSummary,
    summary,
  };
};
