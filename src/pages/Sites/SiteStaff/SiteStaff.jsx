import { useState } from "react";
import { useParams } from "react-router-dom";

import useGetUsers from "src/api/users/useGetUsers";
import useCreateStaff from "src/api/sites/useCreateStaff";
import useGetUsersBySponsor from "src/api/sponsors/useGetUsersBySponsor";

import StaffItem from "src/components/Sponsors/StaffItem";
import AddButton from "src/components/AddButton/AddButton";
import AddStaffModal from "src/components/Modal/AddStaffModal/AddStaffModal";
import useGetUsersBySite from "../../../api/sites/useGetUsersBySite";

function SiteStaff() {
  const { siteId } = useParams();

  const [showStaffModal, setShowStaffModal] = useState(false);

  const { api, users } = useGetUsers({
    isAvailable: true,
  });

  const { api: staffApi, users: staffs } = useGetUsersBySite(siteId);

  const { mutate } = useCreateStaff({
    resetForm: () => null,
  });

  function handleAddStaff(id) {
    mutate({
      siteId,
      userId: id,
    });
  }

  const getStaffsId = () => {
    if (!staffs) return [];
    return staffs?.map((item) => item.userId);
  };

  const getAvailableUsers = () =>
    users.filter(
      (item) =>
        !getStaffsId().includes(item.userId) &&
        !item.sponsorUserId &&
        item.position === "Site Staff"
    );

  if (api.isLoading || staffApi.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <AddButton title="Add Staff" onClick={() => setShowStaffModal(true)} />
      {staffs?.map((item) => (
        <StaffItem key={item.userId} data={item} />
      ))}

      {showStaffModal ? (
        <AddStaffModal
          data={getAvailableUsers()}
          onProceed={handleAddStaff}
          onCancel={() => setShowStaffModal(false)}
        />
      ) : null}
    </div>
  );
}

export default SiteStaff;
