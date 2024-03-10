import { staffApi } from "@/api/staff.api";
import { tableApi } from "@/api/table.api";
import { QueryParam } from "@/types/query";
import { Table, TableSummary } from "@/types/table";
import { User } from "@/types/user";
import { useRef, useState } from "react";

export interface StaffQuery extends QueryParam {}

interface UseStaffProps {
  initQuery: StaffQuery;
}

export const useStaff = ({ initQuery }: UseStaffProps) => {
  const [data, setData] = useState<User[]>([]);
  const query = useRef<StaffQuery>(initQuery);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await staffApi.findAll(query.current);

      setData(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    staffs: data,
    fetchStaffs: fetchData,
    loading,
    query: query.current,
  };
};
