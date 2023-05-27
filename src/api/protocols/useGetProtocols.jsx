import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetProtocolsQuery() {
  return useQuery({
    queryKey: ["protocols"],
    queryFn: () =>
      privateClient({
        url: "/protocols?page=1",
      }),
  });
}

export default function useGetProtocols() {
  const { data, ...others } = useGetProtocolsQuery();
  return {
    protocols: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
