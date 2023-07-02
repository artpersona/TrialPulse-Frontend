import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetSitesBySponsorQuery({ sponsorId, sort }) {
  return useQuery({
    queryKey: ["sponsors", sponsorId, "sites"],
    queryFn: () =>
      privateClient({
        url: `/sponsors/${sponsorId}/sites?page=1&sort=${sort}`,
      }),
  });
}

export default function useGetSitesBySponsor({ sponsorId, sort }) {
  const { data, ...others } = useGetSitesBySponsorQuery({ sponsorId, sort });
  return {
    sites: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
