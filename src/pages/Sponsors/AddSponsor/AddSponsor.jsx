import { useState } from "react";

import useCreateSponsor from "src/api/sponsors/useCreateSponsor";

import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";

import { hasBlank } from "src/utils";
import FormRow from "../../../components/Form/FormRow";
import FormCol from "../../../components/Form/FormCol";
import FormInput from "../../../components/Form/FormInput";

function AddSponsor() {
  const [name, setName] = useState("");
  const [cmo, setCmo] = useState("");
  const [notes, setNotes] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonEmail, setContactPersonEmail] = useState("");
  const [contactPersonNumber1, setContactPersonNumber1] = useState("");
  const [contactPersonNumber2, setContactPersonNumber2] = useState("");
  const [address, setAddress] = useState("");

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

  async function handleAddSponsor() {
    mutate({
      name,
      cmo,
      notes,
      contactPersonName,
      contactPersonEmail,
      contactPersonNumber1,
      contactPersonNumber2,
      address,
    });
  }

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
        <div className="form-row">
          <p className="form-label">Sponsor Name</p>
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <p className="form-label">CRO</p>
          <input
            className="form-input"
            type="text"
            value={cmo}
            onChange={(e) => setCmo(e.target.value)}
          />
        </div>
        <div className="form-row">
          <p className="form-label">Notes</p>
          <textarea
            className="form-input"
            rows="10"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <h2 className="font-medium mt-4">Contact Person Details</h2>
        <FormRow>
          <FormCol label="Name">
            <FormInput
              value={contactPersonName}
              onChange={(e) => setContactPersonName(e.target.value)}
            />
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol label="Email">
            <FormInput
              type="email"
              value={contactPersonEmail}
              onChange={(e) => setContactPersonEmail(e.target.value)}
            />
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol label="Contact Number">
            <FormInput
              value={contactPersonNumber1}
              onChange={(e) => setContactPersonNumber1(e.target.value)}
            />
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol label="Secondary Contact Number">
            <FormInput
              value={contactPersonNumber2}
              onChange={(e) => setContactPersonNumber2(e.target.value)}
            />
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol label="Address">
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
