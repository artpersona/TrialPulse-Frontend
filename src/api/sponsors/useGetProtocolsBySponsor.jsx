import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetProtocolsBySponsorQuery(id) {
  return useQuery({
    queryKey: ["sponsors", id, "protocols"],
    queryFn: () =>
      privateClient({
        url: `/sponsors/${id}/protocols?page=1`,
      }),
  });
}

export default function useGetProtocolsBySponsor(id) {
  const { data, ...others } = useGetProtocolsBySponsorQuery(id);
  return {
    protocols: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
