import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetSponsors() {
  return useQuery({
    queryKey: ["sponsors"],
    queryFn: () =>
      privateClient({
        url: "/sponsors?page=1",
      }),
  });
}

export default useGetSponsors;
