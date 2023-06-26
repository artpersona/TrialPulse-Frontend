import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetUsersBySponsorQuery(id) {
  return useQuery({
    queryKey: ["sponsors", id, "users"],
    queryFn: () =>
      privateClient({
        url: `/sponsors/${id}/users?page=1`,
      }),
  });
}

export default function useGetUsersBySponsor(id) {
  const { data, ...others } = useGetUsersBySponsorQuery(id);
  return {
    users: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
