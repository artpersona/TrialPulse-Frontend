import { useState } from "react";
import { toast } from "react-hot-toast";
import { privateClient } from "../../../api";
import BlackNavbar from "../../../components/Protocols/BlackNavbar/BlackNavbar";
import { useSiteContext } from "../../../contexts/SiteContext";
import { hasBlank } from "../../../utils";

let notification = "";
function AddSite() {
  const { fetchSites } = useSiteContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isDisabled = () => hasBlank([name, email]);

  async function handleAddSponsor() {
    notification = toast.loading("Adding Site...");
    try {
      await privateClient({
        url: "sites",
        method: "post",
        data: {
          name,
          contactEmail: email,
        },
      });
      toast.success("Sponsor has been added successfully.", {
        id: notification,
      });
      fetchSites();
      resetForm();
    } catch (error) {
      toast.error(error, {
        id: notification,
      });
    }
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
