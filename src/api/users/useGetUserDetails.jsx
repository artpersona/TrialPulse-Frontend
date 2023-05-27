import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetUserDetails() {
  return useQuery({
    queryKey: ["users", "details"],
    queryFn: () =>
      privateClient({
        url: "/users/details",
      }),
  });
}

export default useGetUserDetails;
