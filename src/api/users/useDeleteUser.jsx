import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { privateClient } from "../";

let notification = "";

function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ userId }) =>
      privateClient({
        url: `users/${userId}`,
        method: "delete",
      }),

    {
      onMutate: () => {
        notification = toast.loading("Removing User...");
      },

      onSuccess: () => {
        toast.success("User has been successfully removed.", {
          id: notification,
        });
        queryClient.invalidateQueries("users");
      },

      onError: (error) => {
        const {
          response: {
            data: { message },
          },
        } = error;
        toast.error(message, {
          id: notification,
        });
      },
    }
  );
}

export default useDeleteUser;
