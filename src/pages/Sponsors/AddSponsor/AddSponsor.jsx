import { useState } from "react";
import { toast } from "react-hot-toast";
import { privateClient } from "../../../api";
import BlackNavbar from "../../../components/Protocols/BlackNavbar/BlackNavbar";
import { useSponsorContext } from "../../../contexts/SponsorContext";
import { hasBlank } from "../../../utils";

let notification = "";
function AddSponsor() {
  const { fetchSponsors } = useSponsorContext();

  const [name, setName] = useState("");
  const [cmo, setCmo] = useState("");
  const [notes, setNotes] = useState("");

  const isDisabled = () => hasBlank([name, cmo, notes]);

  async function handleAddSponsor() {
    notification = toast.loading("Adding Sponsor...");
    try {
      await privateClient({
        url: "sponsors",
        method: "post",
        data: {
          name,
          cmo,
          notes,
        },
      });
      toast.success("Sponsor has been added successfully.", {
        id: notification,
      });
      fetchSponsors();
      resetForm();
    } catch (error) {
      toast.error(error, {
        id: notification,
      });
    }
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
