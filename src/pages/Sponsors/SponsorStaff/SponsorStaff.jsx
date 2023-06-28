import StaffItem from "src/components/Sponsors/StaffItem";
import AddButton from "../../../components/AddButton/AddButton";
import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import useGetUsers from "../../../api/users/useGetUsers";
import { PlusIcon } from "@heroicons/react/24/solid";
import useCreateStaff from "../../../api/sponsors/useCreateStaff";
import { useParams } from "react-router-dom";
import useGetUsersBySponsor from "../../../api/sponsors/useGetUsersBySponsor";

function SponsorStaff() {
  const { sponsorId } = useParams();
  const [showStaffModal, setShowStaffModal] = useState(false);

  const { api, users } = useGetUsers();
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
        !item.sponsorId &&
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
        <Modal>
          <div className="bg-white border-gray rounded-2xl w-[450px] p-4">
            <h4 className="modal__title">Add Site</h4>
            <div>
              {getAvailableUsers().map((item) => (
                <div
                  key={item.id}
                  className="card py-2 px-4 flex items-center justify-between my-2"
                >
                  <p className="text-sm capitalize">
                    {item.firstName} {item.lastName}
                  </p>
                  <button
                    className="bg-secondary flex gap-2 text-md items-center justify-center px-3 py-1 cursor-pointer rounded-2xl text-white"
                    onClick={() => handleAddStaff(item.userId)}
                  >
                    <PlusIcon height={12} width={12} color="#ffffff" /> Add
                  </button>
                </div>
              ))}
            </div>
            <div className="modal__actions">
              <button
                className="modal-button bg-gray-dark"
                onClick={() => setShowStaffModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default SponsorStaff;
