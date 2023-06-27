import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { privateClient } from "../..";

let notification = "";

function useCreateCriteria(props) {
  const { resetForm, id } = props;

  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      privateClient({
        url: `protocols/${id}/eligibility-criterias`,
        method: "post",
        data,
      }),

    {
      onMutate: () => {
        notification = toast.loading("Adding Criteria...");
      },
      onSuccess: () => {
        toast.success("Criteria has been added successfully.", {
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

export default useCreateCriteria;
