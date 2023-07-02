import { useRef } from "react";

import useZodForm from "src/hooks/useZodForm";

import useCreateSite from "src/api/sites/useCreateSite";

import FormCol from "src/components/Form/FormCol";
import FormInput from "src/components/Form/FormInput";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";

import siteSchema from "src/schema/siteSchema";

function AddSite() {
  const formRef = useRef(null);

  const { mutate } = useCreateSite({
    resetForm: () => null,
  });

  async function handleAddSponsor(data) {
    mutate(data);
    if (formRef) {
      formRef.current.reset();
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(siteSchema);

  return (
    <div className="pb-10">
      <BlackNavbar />

      <form ref={formRef} onSubmit={handleSubmit(handleAddSponsor)}>
        <div className="card w-[400px] p-4">
          <div className="form-row">
            <FormCol label="Site Name" error={errors.name}>
              <FormInput {...register("name")} />
            </FormCol>
          </div>
          <div className="form-row">
            <FormCol label="Email" error={errors.contactEmail}>
              <FormInput {...register("contactEmail")} />
            </FormCol>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="modal-proceed mt-4">
            Add Site
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSite;
