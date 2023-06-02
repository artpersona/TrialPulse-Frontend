import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetProtocolQuery(id) {
  return useQuery({
    queryKey: ["protocols", id],
    queryFn: () =>
      privateClient({
        url: "/protocols/" + id,
      }),
  });
}

export default function useGetProtocol(id) {
  const { data, ...others } = useGetProtocolQuery(id);
  return {
    protocol: data?.data,
    api: {
      ...others,
    },
  };
}
