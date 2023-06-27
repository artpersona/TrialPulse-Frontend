import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetSitesQuery({ sort }) {
  return useQuery({
    queryKey: ["sites"],
    queryFn: () =>
      privateClient({
        url: `/sites?page=1&sort=${sort}`,
      }),
  });
}

export default function useGetSites({ sort }) {
  const { data, ...others } = useGetSitesQuery({ sort });
  return {
    sites: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
