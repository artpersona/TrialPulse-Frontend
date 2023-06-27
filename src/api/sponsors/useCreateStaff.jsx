import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { privateClient } from "..";

let notification = "";

function useCreateStaff(props) {
  const { resetForm } = props;

  const queryClient = useQueryClient();

  return useMutation(
    ({ sponsorId, userId }) =>
      privateClient({
        url: `/sponsors/${sponsorId}/users`,
        method: "post",
        data: {
          userId,
        },
      }),

    {
      onMutate: () => {
        notification = toast.loading("Adding Staff...");
      },
      onSuccess: () => {
        toast.success("Staff has been added successfully.", {
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

export default useCreateStaff;
