import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetUser(id) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () =>
      privateClient({
        url: "/users/" + id,
      }),
  });
}

export default useGetUser;
