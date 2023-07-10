import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { privateClient } from "../";

let notification = "";

function useDeleteSite() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ siteId }) =>
      privateClient({
        url: `sites/${siteId}`,
        method: "delete",
      }),

    {
      onMutate: () => {
        notification = toast.loading("Removing Sites...");
      },

      onSuccess: () => {
        toast.success("Sites has been successfully removed.", {
          id: notification,
        });
        queryClient.invalidateQueries("sites");
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

export default useDeleteSite;
