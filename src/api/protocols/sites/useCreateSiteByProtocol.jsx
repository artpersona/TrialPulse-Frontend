import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { privateClient } from "../..";

let notification = "";

function useCreateSiteByProtocol(props) {
  const { resetForm } = props;

  const queryClient = useQueryClient();

  return useMutation(
    ({ protocolId, data }) =>
      privateClient({
        url: `protocols/${protocolId}/sites`,
        method: "post",
        data,
      }),

    {
      onMutate: () => {
        notification = toast.loading("Adding Site to Protocol...");
      },
      onSuccess: () => {
        toast.success(")Site has been added successfully.", {
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

export default useCreateSiteByProtocol;
