import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { privateClient } from "..";

let notification = "";

function useCreateProtocol(props) {
  const { resetForm } = props;

  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      privateClient({
        url: "/protocols",
        method: "post",
        data,
      }),

    {
      onMutate: () => {
        notification = toast.loading("Adding Protocol...");
      },
      onSuccess: () => {
        toast.success("Protocol has been added successfully.", {
          id: notification,
        });
        resetForm();
        queryClient.invalidateQueries("protocols");
      },
      onError: (error) => {
        toast.error(error, {
          id: notification,
        });
      },
    }
  );
}

export default useCreateProtocol;
