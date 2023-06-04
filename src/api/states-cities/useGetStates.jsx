import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetStatesQuery() {
  return useQuery({
    queryKey: ["states"],
    queryFn: () =>
      privateClient({
        url: "/states?page=1",
      }),
  });
}

export default function useGetStates() {
  const { data, ...others } = useGetStatesQuery();
  return {
    states: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
