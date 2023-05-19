import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { privateClient } from "..";

let notification = "";

function useCreateSponsor(props) {
  const { resetForm } = props;

  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      privateClient({
        url: "/sponsors",
        method: "post",
        data,
      }),

    {
      onMutate: () => {
        notification = toast.loading("Adding Sponsor...");
      },
      onSuccess: () => {
        toast.success("Sponsor has been added successfully.", {
          id: notification,
        });
        resetForm();
        queryClient.invalidateQueries("sponsors");
      },
      onError: (error) => {
        toast.error(error, {
          id: notification,
        });
      },
    }
  );
}

export default useCreateSponsor;
