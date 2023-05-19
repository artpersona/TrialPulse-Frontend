import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetSites() {
  return useQuery({
    queryKey: ["sites"],
    queryFn: () =>
      privateClient({
        url: "/sites?page=1",
      }),
  });
}

export default useGetSites;
