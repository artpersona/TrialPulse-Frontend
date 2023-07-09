import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { privateClient } from "..";

let notification = "";

function useUpdateSponsor(props) {
	const { protocolId, resetForm } = props;

	const queryClient = useQueryClient();

	return useMutation(
		(data) =>
			privateClient({
				url: `/protocols/${protocolId}`,
				method: "put",
				data,
			}),

		{
			onMutate: () => {
				notification = toast.loading("Updating Protocol General Information...");
			},
			onSuccess: () => {
				toast.success("Protocol General Information has been updated successfully.", {
					id: notification,
				});
				resetForm();
				queryClient.invalidateQueries("protocol");
			},
			onError: (error) => {
				toast.error(error, {
					id: notification,
				});
			},
		}
	);
}

export default useUpdateSponsor;
