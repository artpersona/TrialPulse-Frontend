import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { privateClient } from "../../../api";
import Notes from "../../../components/Protocols/Notes/Notes";
import User from "../../../components/Protocols/User/User";
import useGetUser from "../../../api/users/useGetUser";

function UserInformation() {
  const { userId } = useParams();

  const { user, api } = useGetUser(userId);

  if (api.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pb-20">
      <User user={user} />
      <Notes />
    </div>
  );
}

export default UserInformation;
