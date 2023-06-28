import StaffItem from "src/components/Sponsors/StaffItem";
import AddButton from "../../../components/AddButton/AddButton";
import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import useGetUsers from "../../../api/users/useGetUsers";
import { PlusIcon } from "@heroicons/react/24/solid";
import useCreateStaff from "../../../api/sponsors/useCreateStaff";
import { useParams } from "react-router-dom";
import useGetUsersBySponsor from "../../../api/sponsors/useGetUsersBySponsor";
import AddStaffModal from "../../../components/Modal/AddStaffModal/AddStaffModal";

function SponsorStaff() {
  const { sponsorId } = useParams();
  const [showStaffModal, setShowStaffModal] = useState(false);

  const { api, users } = useGetUsers();
  const { api: staffApi, users: staffs } = useGetUsersBySponsor(sponsorId);

  console.log("staffs: ", staffs);
  const { mutate } = useCreateStaff({
    resetForm: () => null,
  });

  function handleAddStaff(id) {
    console.log(id);
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

  console.log("users:", users);
  console.log("available: ", getAvailableUsers());

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
