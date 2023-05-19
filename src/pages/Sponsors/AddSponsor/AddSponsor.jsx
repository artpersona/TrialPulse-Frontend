import { useState } from "react";

import useCreateSponsor from "src/api/sponsors/useCreateSponsor";

import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";

import { hasBlank } from "src/utils";

function AddSponsor() {
  const [name, setName] = useState("");
  const [cmo, setCmo] = useState("");
  const [notes, setNotes] = useState("");

  const isDisabled = () => hasBlank([name, cmo, notes]);

  const { mutate } = useCreateSponsor({
    resetForm,
  });

  async function handleAddSponsor() {
    mutate({
      name,
      cmo,
      notes,
    });
  }

  function resetForm() {
    setName("");
    setCmo("");
    setNotes("");
  }

  return (
    <div className="pb-10">
      <BlackNavbar />

      <div className="card w-[400px] p-4">
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
        <div className="form-actions">
          <button
            className="form-proceed-button"
            disabled={isDisabled()}
            onClick={handleAddSponsor}
          >
            Add Sponsor
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSponsor;
