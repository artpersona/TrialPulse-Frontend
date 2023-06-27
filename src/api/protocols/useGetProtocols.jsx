import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetProtocolsQuery({ sort }) {
  return useQuery({
    queryKey: ["protocols"],
    queryFn: () =>
      privateClient({
        url: `/protocols?page=1&sort=${sort}`,
      }),
  });
}

export default function useGetProtocols({ sort }) {
  const { data, ...others } = useGetProtocolsQuery({ sort });
  return {
    protocols: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
