import { zfd } from "zod-form-data";
import { useState } from "react";
import useCreateSponsor from "src/api/sponsors/useCreateSponsor";

import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";

import { hasBlank } from "src/utils";
import FormRow from "../../../components/Form/FormRow";
import FormCol from "../../../components/Form/FormCol";
import FormInput from "../../../components/Form/FormInput";

const schema = zfd.formData({
  name: zfd.text(),
  cmo: zfd.text(),
  notes: zfd.text(),
  contactPersonName: zfd.text(),
  contactPersonEmail: zfd.text().refine((value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }, "Invalid email address"),
  contactPersonNumber1: zfd.text().refine((value) => {
    const phoneNumberRegex = /^\d{5,}$/;
    return phoneNumberRegex.test(value);
  }, "Invalid phone number"),
  contactPersonNumber2: zfd.text().refine((value) => {
    const phoneNumberRegex = /^\d{5,}$/;
    return phoneNumberRegex.test(value);
  }, "Invalid phone number"),
  address: zfd.text(),
});

function AddSponsor() {
  const [name, setName] = useState("");
  const [cmo, setCmo] = useState("");
  const [notes, setNotes] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonEmail, setContactPersonEmail] = useState("");
  const [contactPersonNumber1, setContactPersonNumber1] = useState("");
  const [contactPersonNumber2, setContactPersonNumber2] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const isDisabled = () =>
    hasBlank([
      name,
      cmo,
      notes,
      contactPersonName,
      contactPersonEmail,
      contactPersonNumber1,
      contactPersonNumber2,
      address,
    ]);

  const { mutate } = useCreateSponsor({
    resetForm,
  });

  const handleAddSponsor = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("cmo", cmo);
      formData.append("notes", notes);
      formData.append("contactPersonName", contactPersonName);
      formData.append("contactPersonEmail", contactPersonEmail);
      formData.append("contactPersonNumber1", contactPersonNumber1);
      formData.append("contactPersonNumber2", contactPersonNumber2);
      formData.append("address", address);
  
      const parsedData = schema.parse(Object.fromEntries(formData.entries()));
      // Handle the parsed data
      console.log(parsedData);
      mutate(parsedData);
  
      setErrors({});
    } catch (error) {
      if (error.formErrors) {
        setErrors(error.formErrors.fieldErrors);
      }
    }
  };  
  
  function resetForm() {
    setName("");
    setCmo("");
    setNotes("");
    setContactPersonName("");
    setContactPersonEmail("");
    setContactPersonNumber1("");
    setContactPersonNumber2("");
    setAddress("");
  }

  return (
    <div className="pb-10">
      <BlackNavbar />

      <div className="card w-[400px] p-4">
        <h2 className="font-medium mt-2">Sponsor Details</h2>
        <FormRow>
          <FormCol label="Sponsor Name" error={errors.name}>
            <FormInput
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol label="CRO" error={errors.cmo}>
            <FormInput
              value={cmo}
              onChange={(e) => setCmo(e.target.value)}
            />
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol label="Notes" error={errors.notes}>
            <FormInput
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormCol>
        </FormRow>

        <h2 className="font-medium mt-4">Contact Person Details</h2>
        <FormRow>
          <FormCol label="Name" error={errors.contactPersonName}>
            <FormInput
              value={contactPersonName}
              onChange={(e) => setContactPersonName(e.target.value)}
            />
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol label="Email" error={errors.contactPersonEmail}>
            <FormInput
              type="email"
              value={contactPersonEmail}
              onChange={(e) => setContactPersonEmail(e.target.value)}
            />
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol label="Contact Number" error={errors.contactPersonNumber1}>
            <FormInput
              value={contactPersonNumber1}
              onChange={(e) => setContactPersonNumber1(e.target.value)}
            />
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol label="Secondary Contact Number" error={errors.contactPersonNumber2}>
            <FormInput
              value={contactPersonNumber2}
              onChange={(e) => setContactPersonNumber2(e.target.value)}
            />
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol label="Address" error={errors.address}>
            <FormInput
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormCol>
        </FormRow>
      </div>
      {/* <div className="form-actions">
        <button
          className="form-proceed-button"
          disabled={isDisabled()}
          onClick={handleAddSponsor}
        >
          Add Sponsor
        </button>
      </div> */}
      <div className="sticky bottom-4 left-0 w-full flex items-center justify-center mt-4">
        <button
          className="button w-64 bg-secondary text-white font-sm py-3 rounded-full hover:bg-secondary-dark"
          // style={{ backgroundColor: colorPalette.SECONDARY_COLOR }}
          disabled={isDisabled()}
          onClick={handleAddSponsor}
        >
          Add Sponsor
        </button>
      </div>
    </div>
  );
}

export default AddSponsor;
