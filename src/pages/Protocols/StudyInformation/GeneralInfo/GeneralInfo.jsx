import { useNavigate, useParams } from "react-router-dom";
import GeneralInfoComponent from "src/components/Protocols/GeneralInfo";
import StudyDetails from "src/components/Protocols/StudyDetails";
import DeleteConfirmation from "../../../../components/Modal/DeleteConfirmation/DeleteConfirmation";
import { useState } from "react";
import useDeleteProtocol from "../../../../api/protocols/useDeleteProtocol";

function GeneralInfo() {
  const { protocolId } = useParams();

  const navigate = useNavigate();
  const { mutate: deleteProtocol } = useDeleteProtocol();

  const [showDeleteCriteriaModal, setShowDeleteCriteriaModal] = useState(false);

  function handleEditClick() {
    navigate("edit-general-info");
  }

  function handleDeleteProtocol() {
    deleteProtocol(
      { protocolId },
      {
        onSuccess: () => {
          navigate("/protocols");
        },
      }
    );
    setShowDeleteCriteriaModal(false);
  }

  return (
    <div className="pb-10">
      <GeneralInfoComponent />
      <StudyDetails />
      <div className="w-full flex flex-col space-y-2 items-center justify-center mt-4">
        {/* <button
          onClick={handleEditClick}
          className="button w-64 bg-secondary text-white font-sm py-3 rounded-full hover:bg-secondary-dark"
        >
          Edit Protocol
        </button> */}

        <button
          onClick={() => setShowDeleteCriteriaModal(true)}
          className="button w-64 bg-red-700 text-white font-sm py-3 rounded-full hover:bg-red-900"
        >
          Delete Protocol
        </button>
      </div>

      {showDeleteCriteriaModal ? (
        <DeleteConfirmation
          title="Remove Protocol?"
          onProceed={handleDeleteProtocol}
          onCancel={() => setShowDeleteCriteriaModal(false)}
        />
      ) : null}
    </div>
  );
}

export default GeneralInfo;
