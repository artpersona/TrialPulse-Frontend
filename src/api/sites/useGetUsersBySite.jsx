import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetUsersBySiteQuery(id) {
  return useQuery({
    queryKey: ["sites", id, "users"],
    queryFn: () =>
      privateClient({
        url: `/sites/${id}/users?page=1`,
      }),
  });
}

export default function useGetUsersBySite(id) {
  const { data, ...others } = useGetUsersBySiteQuery(id);
  return {
    users: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
