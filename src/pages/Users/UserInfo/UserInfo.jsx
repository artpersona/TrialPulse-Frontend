import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { privateClient } from "../../../api";
import Notes from "../../../components/Protocols/Notes/Notes";
import User from "../../../components/Protocols/User/User";
import useGetUser from "../../../api/users/useGetUser";
import DeleteConfirmation from "../../../components/Modal/DeleteConfirmation/DeleteConfirmation";
import useDeleteUser from "../../../api/users/useDeleteUser";

function UserInformation() {
  const { userId } = useParams();

  const navigate = useNavigate();

  const { user, api } = useGetUser(userId);
  const { mutate: deleteUser } = useDeleteUser();

  const [showDeleteCriteriaModal, setShowDeleteCriteriaModal] = useState(false);

  function handleDeleteUser() {
    deleteUser(
      { userId },
      {
        onSuccess: () => {
          navigate("/users");
        },
      }
    );

    setShowDeleteCriteriaModal(false);
  }

  function handleEditClick() {
    navigate("edit-user");
  }

  if (api.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pb-20">
      <User user={user} />
      <Notes />
      <div className="w-full flex flex-col space-y-2 items-center justify-center mt-4">
        <button
          onClick={handleEditClick}
          className="button w-64 bg-secondary text-white font-sm py-3 rounded-full hover:bg-secondary-dark"
        >
          Edit User
        </button>
        <button
          onClick={() => setShowDeleteCriteriaModal(true)}
          className="button w-64 bg-red-700 text-white font-sm py-3 rounded-full hover:bg-red-900"
        >
          Delete User
        </button>
      </div>
      {showDeleteCriteriaModal ? (
        <DeleteConfirmation
          title="Remove User?"
          onProceed={handleDeleteUser}
          onCancel={() => setShowDeleteCriteriaModal(false)}
        />
      ) : null}
    </div>
  );
}

export default UserInformation;
