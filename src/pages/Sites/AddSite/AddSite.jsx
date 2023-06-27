import { useState } from "react";
import BlackNavbar from "../../../components/Protocols/BlackNavbar/BlackNavbar";
import { hasBlank } from "../../../utils";
import useCreateSite from "../../../api/sites/useCreateSite";

function AddSite() {
  const { mutate } = useCreateSite({
    resetForm: () => resetForm(),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isDisabled = () => hasBlank([name, email]);

  async function handleAddSponsor() {
    mutate({
      name,
      contactEmail: email,
    });
  }

  function resetForm() {
    setName("");
    setEmail("");
  }

  return (
    <div className="pb-10">
      <BlackNavbar />

      <div className="card w-[400px] p-4">
        <div className="form-row">
          <p className="form-label">Site Name</p>
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <p className="form-label">Email</p>
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button
            className="form-proceed-button"
            disabled={isDisabled()}
            onClick={handleAddSponsor}
          >
            Add Site
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSite;
