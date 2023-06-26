import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetSitesBySponsorQuery(id) {
  return useQuery({
    queryKey: ["sponsors", id, "sites"],
    queryFn: () =>
      privateClient({
        url: `/sponsors/${id}/sites?page=1`,
      }),
  });
}

export default function useGetSitesBySponsor(id) {
  const { data, ...others } = useGetSitesBySponsorQuery(id);
  return {
    sites: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
