import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { privateClient } from "../../../api";
import Notes from "../../../components/Protocols/Notes/Notes";
import User from "../../../components/Protocols/User/User";

function UserInformation() {
  const { userId } = useParams();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  async function fetchUser() {
    try {
      const res = await privateClient({
        url: `/users/${userId}`,
        method: "get",
      });
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="pb-20">
      <User userData={user} />
      <Notes />
    </div>
  );
}

export default UserInformation;
