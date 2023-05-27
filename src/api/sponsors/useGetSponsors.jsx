import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetSponsorsQuery() {
  return useQuery({
    queryKey: ["sponsors"],
    queryFn: () =>
      privateClient({
        url: "/sponsors?page=1",
      }),
  });
}

export default function useGetSponsors() {
  const { data, ...others } = useGetSponsorsQuery();
  return {
    sponsors: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
