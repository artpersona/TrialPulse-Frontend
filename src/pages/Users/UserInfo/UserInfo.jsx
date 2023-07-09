import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { privateClient } from "../../../api";
import Notes from "../../../components/Protocols/Notes/Notes";
import User from "../../../components/Protocols/User/User";
import useGetUser from "../../../api/users/useGetUser";

function UserInformation() {
	const { userId } = useParams();

	const { user, api } = useGetUser(userId);

	const navigate = useNavigate();

	if (api.isLoading) {
		return <div>Loading...</div>;
	}

	function handleEditClick() {
		navigate("edit-user");
	}

	return (
		<div className="pb-20">
			<User user={user} />
			<Notes />
			<div className="sticky bottom-4 left-0 w-full flex items-center justify-center mt-4">
				<button
					onClick={handleEditClick}
					className="button w-64 bg-secondary text-white font-sm py-3 rounded-full hover:bg-secondary-dark"
				>
					Edit User
				</button>
			</div>
		</div>
	);
}

export default UserInformation;
