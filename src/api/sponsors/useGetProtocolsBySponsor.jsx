import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetProtocolsBySponsorQuery({ sponsorId, sort }) {
  return useQuery({
    queryKey: ["sponsors", sponsorId, "protocols"],
    queryFn: () =>
      privateClient({
        url: `/sponsors/${sponsorId}/protocols?page=1&sort=${sort}`,
      }),
  });
}

export default function useGetProtocolsBySponsor({ sponsorId, sort }) {
  const { data, ...others } = useGetProtocolsBySponsorQuery({
    sponsorId,
    sort,
  });
  return {
    protocols: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
