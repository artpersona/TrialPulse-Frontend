import StaffItem from "src/components/Sponsors/StaffItem";
// import AddButton from "../../../components/AddButton/AddButton";
// import { useState } from "react";
// import Modal from "../../../components/Modal/Modal";
// import { PlusIcon } from "@heroicons/react/24/solid";
// import useCreateStaff from "../../../api/sponsors/useCreateStaff";
// import { useParams } from "react-router-dom";
import useGetUsersBySponsor from "../../../api/sponsors/useGetUsersBySponsor";
import { useAuthContext } from "../../../contexts/AuthContext";

function SponsorStaff() {
  const { userDetails } = useAuthContext();

  const { sponsorId } = userDetails;

  console.log(sponsorId);

  //   const [showStaffModal, setShowStaffModal] = useState(false);

  const { api, users: staffs } = useGetUsersBySponsor(sponsorId);
  console.log(staffs);
  //   console.log("staffs: ", staffs);

  //   const { mutate } = useCreateStaff({
  //     resetForm: () => null,
  //   });

  //   console.log(users);

  //   function handleAddStaff(id) {
  //     mutate({
  //       sponsorId,
  //       userId: id,
  //     });
  //   }

  //   const getStaffsId = () => staffs.map((item) => item.userId);

  //   const getAvailableUsers = () =>
  //     users.filter((item) => !getStaffsId().includes(item.userId));

  if (api.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {staffs.map((item) => (
        <StaffItem key={item.userId} data={item} />
      ))}

      {/* {showStaffModal ? (
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
      ) : null} */}
    </div>
  );
}

export default SponsorStaff;
