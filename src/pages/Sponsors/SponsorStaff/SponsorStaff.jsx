import { useState } from "react";
import { useParams } from "react-router-dom";

import useGetUsers from "src/api/users/useGetUsers";
import useCreateStaff from "src/api/sponsors/useCreateStaff";
import useGetUsersBySponsor from "src/api/sponsors/useGetUsersBySponsor";

import StaffItem from "src/components/Sponsors/StaffItem";
import AddButton from "src/components/AddButton/AddButton";
import AddStaffModal from "src/components/Modal/AddStaffModal/AddStaffModal";

function SponsorStaff() {
  const { sponsorId } = useParams();
  const [showStaffModal, setShowStaffModal] = useState(false);

  const { api, users } = useGetUsers({
    isAvailable: true,
  });
  const { api: staffApi, users: staffs } = useGetUsersBySponsor(sponsorId);

  const { mutate } = useCreateStaff({
    resetForm: () => null,
  });

  function handleAddStaff(id) {
    mutate({
      sponsorId,
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
        (item.position === "Sponsor Staff" || item.position === "Sponsor Admin")
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

export default SponsorStaff;
