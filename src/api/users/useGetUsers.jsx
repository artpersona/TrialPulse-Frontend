import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      privateClient({
        url: "/users?page=1",
      }),
  });
}

export default useGetUsers;
