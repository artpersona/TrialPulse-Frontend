import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { privateClient } from "../";

let notification = "";

function useDeleteSponsor() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ sponsorId }) =>
      privateClient({
        url: `sponsors/${sponsorId}`,
        method: "delete",
      }),

    {
      onMutate: () => {
        notification = toast.loading("Removing Sponsor...");
      },

      onSuccess: () => {
        toast.success("Sponsor has been successfully removed.", {
          id: notification,
        });
        queryClient.invalidateQueries("sponsors");
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

export default useDeleteSponsor;
