import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetProtocolsBySiteQuery(id) {
  return useQuery({
    queryKey: ["sites", id, "protocols"],
    queryFn: () =>
      privateClient({
        url: `/sites/${id}/protocols?page=1`,
      }),
  });
}

export default function useGetProtocolsBySite(id) {
  const { data, ...others } = useGetProtocolsBySiteQuery(id);
  return {
    protocols: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
