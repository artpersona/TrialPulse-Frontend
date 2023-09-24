import { useRef } from "react";

import useZodForm from "src/hooks/useZodForm";

import useCreateSponsor from "src/api/sponsors/useCreateSponsor";

import FormRow from "src/components/Form/FormRow";
import FormCol from "src/components/Form/FormCol";
import FormInput from "src/components/Form/FormInput";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";

import sponsorSchema from "src/schema/sponsorSchema";

function AddSponsor() {
  const formRef = useRef(null);

  const { mutate } = useCreateSponsor({
    resetForm: () => null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(sponsorSchema);

  const handleAddSponsor = (data) => {
    mutate(data);

    if (formRef) {
      formRef.current.reset();
    }
  };

  return (
    <div className="pb-10 relative">
      <BlackNavbar />

      <form ref={formRef} onSubmit={handleSubmit(handleAddSponsor)}>
        <div className="card w-[400px] p-4">
          <h2 className="font-medium mt-2">Sponsor Details</h2>
          <FormRow>
            <FormCol label="Sponsor Name" error={errors.name}>
              <FormInput {...register("name")} />
            </FormCol>
          </FormRow>
          <FormRow>
            <FormCol label="CRO" error={errors.cmo}>
              <FormInput {...register("cmo")} />
            </FormCol>
          </FormRow>
          <FormRow>
            <FormCol label="Notes" error={errors.notes}>
              <FormInput {...register("notes")} />
            </FormCol>
          </FormRow>

          <h2 className="font-medium mt-4">Contact Person Details</h2>
          <FormRow>
            <FormCol label="Name" error={errors.contactPersonName}>
              <FormInput {...register("contactPersonName")} />
            </FormCol>
          </FormRow>
          <FormRow>
            <FormCol label="Email" error={errors.contactPersonEmail}>
              <FormInput {...register("contactPersonEmail")} />
            </FormCol>
          </FormRow>
          <FormRow>
            <FormCol label="Contact Number" error={errors.contactPersonNumber1}>
              <FormInput {...register("contactPersonNumber1")} />
            </FormCol>
          </FormRow>
          <FormRow>
            <FormCol
              label="Secondary Contact Number"
              error={errors.contactPersonNumber2}
            >
              <FormInput {...register("contactPersonNumber2")} />
            </FormCol>
          </FormRow>
          <FormRow>
            <FormCol label="Address" error={errors.address}>
              <FormInput {...register("address")} />
            </FormCol>
          </FormRow>
        </div>

        <div className="absolute -left-80 top-5 w-full flex items-center">
          <button
            type="submit"
            className="button w-64 bg-secondary text-white font-sm py-3 rounded-full hover:bg-secondary-dark"
          >
            Add Sponsor
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSponsor;
