import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetSponsorsQuery({ sort }) {
  return useQuery({
    queryKey: ["sponsors"],
    queryFn: () =>
      privateClient({
        url: `/sponsors?page=1&sort=${sort}`,
      }),
  });
}

export default function useGetSponsors({ sort = "" }) {
  const { data, ...others } = useGetSponsorsQuery({ sort });
  return {
    sponsors: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
