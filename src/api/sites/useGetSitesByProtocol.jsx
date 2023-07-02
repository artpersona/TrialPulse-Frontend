import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetSitesByProtocolQuery(id) {
  return useQuery({
    queryKey: ["protocols", id, "sites"],
    queryFn: () =>
      privateClient({
        url: `/protocols/${id}/sites?page=1`,
      }),
  });
}

export default function useGetSitesByProtocol(id) {
  const { data, ...others } = useGetSitesByProtocolQuery(id);
  return {
    sites: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
