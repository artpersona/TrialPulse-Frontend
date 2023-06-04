import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useSearchCitiesQuery(stateId, search) {
  return useQuery({
    queryKey: ["cities", stateId, search],
    queryFn: () =>
      privateClient({
        url: `/states/${stateId}/cities?search=${search}&page=1`,
      }),
    enabled: !!stateId,
  });
}

export default function useSearchCities(stateId, search) {
  const { data, ...others } = useSearchCitiesQuery(stateId, search);
  return {
    searchedCities: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
