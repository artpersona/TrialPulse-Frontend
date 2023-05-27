import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { privateClient } from "..";

let notification = "";

function useCreateUser(props) {
  const { resetForm } = props;

  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      privateClient({
        url: "/users",
        method: "post",
        data,
      }),

    {
      onMutate: () => {
        notification = toast.loading("Adding User...");
      },
      onSuccess: () => {
        toast.success("User has been added successfully.", {
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

export default useCreateUser;
