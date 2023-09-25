import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetAlertsQuery({ sort }) {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: () =>
      privateClient({
        url: `/alerts?page=1&sort=${sort}`,
      }),
  });
}

export default function useGetAlerts({ sort }) {
  const { data, ...others } = useGetAlertsQuery({ sort });
  return {
    alerts: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
