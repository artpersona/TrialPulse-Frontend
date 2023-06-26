import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetSiteBySponsorQuery(id) {
  return useQuery({
    queryKey: ["sponsors", id, "sites"],
    queryFn: () =>
      privateClient({
        url: `/sponsors/${id}/sites`,
      }),
  });
}

export default function useGetSiteBySponsor(id) {
  const { data, ...others } = useGetSiteBySponsorQuery(id);
  return {
    site: data?.data,
    api: {
      ...others,
    },
  };
}
