import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetCitiesQuery(stateId) {
  return useQuery({
    queryKey: ["cities", stateId],
    queryFn: () =>
      privateClient({
        url: `/states/${stateId}/cities?page=1`,
      }),
  });
}

export default function useGetCities(stateId) {
  const { data, ...others } = useGetCitiesQuery(stateId);
  return {
    cities: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
