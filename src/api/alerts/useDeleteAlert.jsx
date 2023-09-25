import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { privateClient } from "..";

let notification = "";

function useDeleteAlert() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ alertId }) =>
      privateClient({
        url: `alerts/${alertId}`,
        method: "delete",
      }),

    {
      onMutate: () => {
        notification = toast.loading("Removing Alert...");
      },

      onSuccess: () => {
        toast.success("Alert has been successfully removed.", {
          id: notification,
        });
        queryClient.invalidateQueries("alerts");
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

export default useDeleteAlert;
