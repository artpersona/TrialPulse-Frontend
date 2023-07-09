import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { privateClient } from "..";

let notification = "";

function useUpdateSponsor(props) {
	const { sponsorId, resetForm } = props;

	const queryClient = useQueryClient();

	return useMutation(
		(data) =>
			privateClient({
				url: `/sponsors/${sponsorId}`,
				method: "put",
				data,
			}),

		{
			onMutate: () => {
				notification = toast.loading("Updating Sponsor...");
			},
			onSuccess: () => {
				toast.success("Sponsor has been updated successfully.", {
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

export default useUpdateSponsor;
