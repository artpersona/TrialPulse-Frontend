import { useQuery } from "@tanstack/react-query";
import { privateClient } from "..";

function useGetUsersQuery({ isAvailable }) {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      privateClient({
        url: `/users?page=1&isAvailable=${isAvailable}`,
      }),
  });
}

export default function useGetUsers({ isAvailable = false }) {
  const { data, ...others } = useGetUsersQuery({ isAvailable });
  return {
    users: data?.data?.data,
    pagination: data?.data?.pagination,
    api: {
      ...others,
    },
  };
}
