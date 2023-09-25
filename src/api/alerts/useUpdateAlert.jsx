import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { privateClient } from "..";

let notification = "";

function useUpdateAlert(props) {
	const { alertId, resetForm } = props;

	const queryClient = useQueryClient();

	return useMutation(
		(data) =>
			privateClient({
				url: `/alerts/${alertId}`,
				method: "put",
				data,
			}),

		{
			onMutate: () => {
				notification = toast.loading("Updating Alert...");
			},
			onSuccess: () => {
				toast.success("Alert has been updated successfully.", {
					id: notification,
				});
				resetForm();
				queryClient.invalidateQueries("alerts");
			},
			onError: (error) => {
				toast.error(error, {
					id: notification,
				});
			},
		}
	);
}

export default useUpdateAlert;
