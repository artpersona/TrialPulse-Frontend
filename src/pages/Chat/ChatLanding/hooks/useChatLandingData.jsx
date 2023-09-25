import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import useGetUsers from "../../../../api/users/useGetUsers";
const useChatLandingData = () => {
  const { users, api } = useGetUsers({ isAvailable: false });

  const { userDetails } = useAuthContext();
  const [adminContacts, setAdminContacts] = useState([]);

  useEffect(() => {
    if (userDetails?.friends && !api.isLoading) {
      const friends =
        Object.values(userDetails.friends).sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        ) || [];

      let contacts = friends.map((friend) => {
        const user = users?.find((u) => u.id === friend.id);
        return {
          ...friend,
          ...user,
        };
      });

      console.log("contacts are: ", contacts);

      setAdminContacts(contacts);
    } else {
      setAdminContacts([]);
      console.log("no friends!");
    }
  }, [userDetails?.friends, api.isLoading]);

  return {
    adminContacts,
  };
};

export default useChatLandingData;
