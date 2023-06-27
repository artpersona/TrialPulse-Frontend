import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { privateClient } from "../..";

let notification = "";

function useDeleteCriteria(props) {
  const { resetForm } = props;

  const queryClient = useQueryClient();

  return useMutation(
    ({ protocolId, criteriaId }) =>
      privateClient({
        url: `protocols/${protocolId}/eligibility-criterias/${criteriaId}`,
        method: "delete",
      }),

    {
      onMutate: () => {
        notification = toast.loading("Removing Criteria...");
      },
      onSuccess: () => {
        toast.success("Criteria has been successfully removed.", {
          id: notification,
        });
        resetForm();
        queryClient.invalidateQueries("criterias");
      },
      onError: (error) => {
        toast.error(error, {
          id: notification,
        });
      },
    }
  );
}

export default useDeleteCriteria;
