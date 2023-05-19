import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetProtocols() {
  return useQuery({
    queryKey: ["protocols"],
    queryFn: () =>
      privateClient({
        url: "/protocols?page=1",
      }),
  });
}

export default useGetProtocols;
