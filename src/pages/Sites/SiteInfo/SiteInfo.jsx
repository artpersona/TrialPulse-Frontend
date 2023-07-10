import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { privateClient } from "src/api";
import useDeleteSite from "src/api/sites/useDeleteSite";

import Notes from "src/components/Protocols/Notes/Notes";
import Site from "src/components/Protocols/Site/Site";
import DeleteConfirmation from "src/components/Modal/DeleteConfirmation/DeleteConfirmation";

function SiteInformation() {
  const { siteId } = useParams();

  const { mutate: deleteSite } = useDeleteSite();

  const [loading, setLoading] = useState(true);
  const [site, setSite] = useState(null);
  const [showDeleteCriteriaModal, setShowDeleteCriteriaModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSponsor();
  }, [siteId]);

  async function fetchSponsor() {
    try {
      const res = await privateClient({
        url: `/sites/${siteId}`,
        method: "get",
      });
      setSite(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditClick() {
    navigate("edit-site");
  }

  function handleDeleteSite() {
    deleteSite(
      { siteId },
      {
        onSuccess: () => {
          navigate("/sites");
        },
      }
    );
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="pb-20">
      <Site title={site?.name} />
      <Notes />
      <div className="w-full flex flex-col space-y-2 items-center justify-center mt-4">
        <button
          onClick={handleEditClick}
          className="button w-64 bg-secondary text-white font-sm py-3 rounded-full hover:bg-secondary-dark"
        >
          Edit Site
        </button>
        <button
          onClick={() => setShowDeleteCriteriaModal(true)}
          className="button w-64 bg-red-700 text-white font-sm py-3 rounded-full hover:bg-red-900"
        >
          Delete Site
        </button>
      </div>

      {showDeleteCriteriaModal ? (
        <DeleteConfirmation
          title="Remove Site?"
          onProceed={handleDeleteSite}
          onCancel={() => setShowDeleteCriteriaModal(false)}
        />
      ) : null}
    </div>
  );
}

export default SiteInformation;
