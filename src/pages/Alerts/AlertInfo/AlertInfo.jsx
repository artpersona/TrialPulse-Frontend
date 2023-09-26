import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { privateClient } from "src/api";
import useDeleteAlert from "src/api/alerts/useDeleteAlert";

import DeleteConfirmation from "src/components/Modal/DeleteConfirmation/DeleteConfirmation";
import FormCol from "src/components/Form/FormCol";
import FormInput from "src/components/Form/FormInput";
import useGetAlert from "../../../api/alerts/useGetAlert";

function AlertInformation() {
  const { alertId } = useParams();

  const { mutate: deleteAlert } = useDeleteAlert();
  const { alert, api } = useGetAlert(alertId);

  const [showDeleteCriteriaModal, setShowDeleteCriteriaModal] = useState(false);

  const navigate = useNavigate();

  function handleEditClick() {
    navigate("edit-alert");
  }

  function handleDeleteAlert() {
    deleteAlert(
      { alertId },
      {
        onSuccess: () => {
          navigate("/alerts");
        },
      }
    );
  }

  if (api.isLoading) {
    return <div>Loading...</div>;
  }

  // if (loading) {
  //   return <div></div>;
  // }

  return (
    <div className="pb-20 relative">
      <div className="card w-[400px] p-4">
					<div className="form-row">
						<FormCol label="Message" >
							<FormInput value={alert?.message} disabled/>
						</FormCol>
					</div>

          <div className="form-row">
            <FormCol label="Is Active">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={alert?.isActive}
                  disabled
                />
                <span className="slider round"></span>
              </label>
            </FormCol>
          </div>
				</div>
      <div className="absolute -left-96 top-0 w-full flex items-center">
        <div className="w-full flex flex-col space-y-2 items-center justify-center mt-4">
          <button
            onClick={handleEditClick}
            className="button w-64 bg-secondary text-white font-sm py-3 rounded-full hover:bg-secondary-dark"
          >
            Edit Alert
          </button>
          <button
            onClick={() => setShowDeleteCriteriaModal(true)}
            className="button w-64 bg-red-700 text-white font-sm py-3 rounded-full hover:bg-red-900"
          >
            Delete Alert
          </button>
        </div>
      </div>

      {showDeleteCriteriaModal ? (
        <DeleteConfirmation
          title="Remove Alert?"
          onProceed={handleDeleteAlert}
          onCancel={() => setShowDeleteCriteriaModal(false)}
        />
      ) : null}
    </div>
  );
}

export default AlertInformation;
