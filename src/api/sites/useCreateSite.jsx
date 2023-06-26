import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { privateClient } from "..";

let notification = "";

function useCreateSite(props) {
  const { resetForm } = props;

  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      privateClient({
        url: "/sites",
        method: "post",
        data,
      }),

    {
      onMutate: () => {
        notification = toast.loading("Adding Site...");
      },
      onSuccess: () => {
        toast.success("Site has been added successfully.", {
          id: notification,
        });
        resetForm();
        queryClient.invalidateQueries("sites");
      },
      onError: (error) => {
        toast.error(error, {
          id: notification,
        });
      },
    }
  );
}

export default useCreateSite;
