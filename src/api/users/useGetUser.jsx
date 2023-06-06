import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetUserQuery(id) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () =>
      privateClient({
        url: "/users/" + id,
      }),
  });
}

export default function useGetUser(id) {
  const { data, ...others } = useGetUserQuery(id);

  return {
    user: data?.data,
    api: {
      ...others,
    },
  };
}
