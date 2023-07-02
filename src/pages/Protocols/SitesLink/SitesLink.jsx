import { useState } from "react";
import { useParams } from "react-router-dom";
import { BuildingOfficeIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

import useGetSites from "src/api/sites/useGetSites";
import useGetSitesByProtocol from "src/api/sites/useGetSitesByProtocol";
import useCreateSiteByProtocol from "src/api/protocols/sites/useCreateSiteByProtocol";

import Modal from "src/components/Modal/Modal";
import AddButton from "src/components/AddButton/AddButton";
import SitesLinkComponent from "src/components/Protocols/SitesLink";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";
import AvatarContainer from "src/components/AvatarContainer/AvatarContainer";

function SitesLink() {
  const { protocolId } = useParams();

  const [showAddSiteModal, setShowAddSiteModal] = useState(false);

  const { sites: protocolSites, api: protocolSitesApi } =
    useGetSitesByProtocol(protocolId);
  const { sites, api } = useGetSites({ sort: "" });

  const { mutate } = useCreateSiteByProtocol({
    resetForm: () => null,
  });

  async function handleAddProtocolSite(id) {
    mutate({
      protocolId,
      data: {
        siteId: id,
      },
    });
  }

  const getAvailableSites = () => {
    const protocolSiteIds = protocolSites.map((item) => item.id);
    return sites.filter((item) => !protocolSiteIds.includes(item.id));
  };

  if (api.isLoading || protocolSitesApi.isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <BlackNavbar />

      <AddButton title="Add Sites" onClick={() => setShowAddSiteModal(true)} />

      {protocolSites.map((item) => (
        <SitesLinkComponent key={item.id} data={item} />
      ))}

      {showAddSiteModal ? (
        <Modal>
          <div className="bg-white border-gray rounded-2xl w-[450px] p-4">
            <h4 className="modal__title">Add Site</h4>
            <div>
              {getAvailableSites().map((data) => (
                <div
                  key={data.id}
                  className={`has-transition flex items-center border py-2 px-4 rounded-full gap-2 w-full mb-2 shadow-md `}
                >
                  <AvatarContainer Icon={BuildingOfficeIcon} />

                  <div className="flex-1">
                    <h4 className="text-primary text-sm font-medium flex-1 capitalize">
                      {data.name}
                    </h4>
                    <p className="text-xs text-gray">{data.contactEmail}</p>
                  </div>

                  <div
                    className="has-transition group p-1 bg-gray-200 flex items-center justify-center rounded-full cursor-pointer hover:bg-secondary hover:scale-110"
                    onClick={() => handleAddProtocolSite(data.id)}
                  >
                    <CheckCircleIcon className="has-transition w-6 h-6 text-secondary group-hover:text-white" />
                  </div>
                </div>
              ))}
            </div>
            <div className="modal__actions">
              <button
                className="modal-cancel"
                onClick={() => setShowAddSiteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default SitesLink;
