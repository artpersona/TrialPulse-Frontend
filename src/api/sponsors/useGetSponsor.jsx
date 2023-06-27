import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetSponsorQuery(id) {
  return useQuery({
    queryKey: ["sponsors", id],
    queryFn: () =>
      privateClient({
        url: "/sponsors/" + id,
      }),
  });
}

export default function useGetSponsor(id) {
  const { data, ...others } = useGetSponsorQuery(id);

  return {
    sponsor: data?.data,
    api: {
      ...others,
    },
  };
}
