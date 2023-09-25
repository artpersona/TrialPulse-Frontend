import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { privateClient } from "..";

let notification = "";

function useCreateAlert(props) {
  const { resetForm } = props;

  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      privateClient({
        url: "/alerts",
        method: "post",
        data,
      }),

    {
      onMutate: () => {
        notification = toast.loading("Adding Alert...");
      },
      onSuccess: () => {
        toast.success("Alert has been added successfully.", {
          id: notification,
        });
        resetForm();
        queryClient.invalidateQueries("alerts");
      },
      onError: (error) => {
        toast.error(error, {
          id: notification,
        });
      },
    }
  );
}

export default useCreateAlert;
