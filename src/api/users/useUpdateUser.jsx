import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { privateClient } from "..";

let notification = "";

function useUpdateUser(props) {
	const { userId, resetForm } = props;

	const queryClient = useQueryClient();

	return useMutation(
		(data) =>
			privateClient({
				url: `/users/${userId}`,
				method: "put",
				data,
			}),

		{
			onMutate: () => {
				notification = toast.loading("Updating Users...");
			},
			onSuccess: () => {
				toast.success("User has been updated successfully.", {
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

export default useUpdateUser;
