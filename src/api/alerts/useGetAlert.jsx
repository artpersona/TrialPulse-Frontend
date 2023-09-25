import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetAlertQuery(id) {
  return useQuery({
    queryKey: ["alerts", id],
    queryFn: () =>
      privateClient({
        url: `/alerts/${id}`,
      }),
  });
}

export default function useGetAlert(id) {
  const { data, ...others } = useGetAlertQuery(id);
  return {
    alert: data?.data,
    api: {
      ...others,
    },
  };
}
