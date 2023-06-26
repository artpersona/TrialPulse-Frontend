import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetSiteQuery(id) {
  return useQuery({
    queryKey: ["sites", id],
    queryFn: () =>
      privateClient({
        url: `/sites/${id}`,
      }),
  });
}

export default function useGetSite(id) {
  const { data, ...others } = useGetSiteQuery(id);
  return {
    site: data?.data,
    api: {
      ...others,
    },
  };
}
