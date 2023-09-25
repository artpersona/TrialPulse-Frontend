import { useRef } from "react";

import useZodForm from "src/hooks/useZodForm";

import useCreateAlert from "src/api/alerts/useCreateAlert";

import FormCol from "src/components/Form/FormCol";
import FormInput from "src/components/Form/FormInput";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";

import alertSchema from "src/schema/alertSchema";

function AddAlert() {
  const formRef = useRef(null);

  const { mutate } = useCreateAlert({
    resetForm: () => null,
  });

  async function handleAddAlert(data) {
    mutate(data);
    if (formRef) {
      formRef.current.reset();
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(alertSchema);

  return (
    <div className="pb-10">
      <BlackNavbar />

      <form ref={formRef} onSubmit={handleSubmit(handleAddAlert)}>
        <div className="card w-[400px] p-4">
          <div className="form-row">
            <FormCol label="Message" error={errors.message}>
              <FormInput {...register("message")} />
            </FormCol>
          </div>
          <div className="form-row">
            <FormCol label="Is Active" error={errors.isActive}>
              <label className="switch">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  defaultChecked={true}
                />
                <span className="slider round"></span>
              </label>
            </FormCol>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="modal-proceed mt-4">
            Add Alert
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAlert;
