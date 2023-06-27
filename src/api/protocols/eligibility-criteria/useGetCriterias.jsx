import { useQuery } from "@tanstack/react-query";
import { privateClient } from "../..";

function useGetCriteriasQuery({ protocolId, isInclusion }) {
  return useQuery({
    queryKey: ["criterias"],
    queryFn: () =>
      privateClient({
        url: `/protocols/${protocolId}/eligibility-criterias?page=1&isInclusion=${isInclusion}`,
      }),
  });
}

export default function useGetCriterias({ protocolId, isInclusion = false }) {
  const { data, ...others } = useGetCriteriasQuery({ protocolId, isInclusion });
  return {
    criterias: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
