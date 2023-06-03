import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetUsersQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      privateClient({
        url: "/users?page=1",
      }),
  });
}

export default function useGetUsers() {
  const { data, ...others } = useGetUsersQuery();
  console.log(data)
  return {
    users: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
