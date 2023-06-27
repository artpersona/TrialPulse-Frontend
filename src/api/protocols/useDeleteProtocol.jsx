import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { privateClient } from "..";

let notification = "";

function useDeleteProtocol(props) {
  const { resetForm } = props;

  const queryClient = useQueryClient();

  return useMutation(
    ({ protocolId }) =>
      privateClient({
        url: `protocols/${protocolId}`,
        method: "delete",
      }),

    {
      onMutate: () => {
        notification = toast.loading("Removing Protocol...");
      },
      onSuccess: () => {
        toast.success("Protocol has been successfully removed.", {
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

export default useDeleteProtocol;
