import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { privateClient } from "..";

let notification = "";

function useUpdateSite(props) {
	const { siteId, resetForm } = props;

	const queryClient = useQueryClient();

	return useMutation(
		(data) =>
			privateClient({
				url: `/sites/${siteId}`,
				method: "put",
				data,
			}),

		{
			onMutate: () => {
				notification = toast.loading("Updating Site...");
			},
			onSuccess: () => {
				toast.success("Site has been updated successfully.", {
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

export default useUpdateSite;
