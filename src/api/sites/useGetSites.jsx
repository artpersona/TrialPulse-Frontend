import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetSitesQuery() {
  return useQuery({
    queryKey: ["sites"],
    queryFn: () =>
      privateClient({
        url: "/sites?page=1",
      }),
  });
}

export default function useGetSites() {
  const { data, ...others } = useGetSitesQuery();
  return {
    sites: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
