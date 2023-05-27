import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { privateClient } from "..";

let notification = "";

function useDeleteUser(props) {
  const { resetForm } = props;

  const queryClient = useQueryClient();

  return useMutation(
    (id) =>
      privateClient({
        url: "/users/" + id,
        method: "delete",
      }),

    {
      onMutate: () => {
        notification = toast.loading("Deleting User...");
      },
      onSuccess: () => {
        toast.success("User has been successfully deleted.", {
          id: notification,
        });
        resetForm();
        queryClient.invalidateQueries("users");
      },
      onError: (error) => {
        toast.error(error, {
          id: notification,
        });
      },
    }
  );
}

export default useDeleteUser;
