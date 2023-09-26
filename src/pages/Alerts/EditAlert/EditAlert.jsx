import { useRef } from "react";

import useZodForm from "src/hooks/useZodForm";

import useUpdateAlert from "src/api/alerts/useUpdateAlert";

import FormCol from "src/components/Form/FormCol";
import FormInput from "src/components/Form/FormInput";

import alertSchema from "src/schema/alertSchema";
import { useNavigate, useParams } from "react-router-dom";
import useGetAlert from "../../../api/alerts/useGetAlert";
import "./EditAlert.style.css";

function EditAlert() {
  const formRef = useRef(null);
  const { alertId } = useParams();
  const { api, alert } = useGetAlert(alertId);
  const navigate = useNavigate();

  const { mutate } = useUpdateAlert({
    resetForm: () => null,
    alertId,
  });
  async function handleUpdateAlert(data) {
    console.log(data);
    mutate(data);
    navigate(-1);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(alertSchema);

  if (api.isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="pb-10">
      <form ref={formRef} onSubmit={handleSubmit(handleUpdateAlert)}>
        <div className="card w-[400px] p-4">
          <div className="form-row">
            <FormCol label="Message" error={errors.message}>
              <FormInput
                {...register("message")}
                defaultValue={alert.message}
              />
            </FormCol>
          </div>

          <div className="form-row">
            <FormCol label="Is Active" error={errors.isActive}>
              <label className="switch">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  checked={alert.isActive}
                />
                <span className="slider round"></span>
              </label>
            </FormCol>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="modal-proceed mt-4">
            Update Alert
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAlert;
