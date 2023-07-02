import { useEffect, useState } from "react";
import {
  BuildingOfficeIcon,
  CheckCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

import { privateClient } from "src/api";

import Modal from "src/components/Modal/Modal";
import AddButton from "src/components/AddButton/AddButton";
import SitesLinkComponent from "src/components/Protocols/SitesLink";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";
import { useParams } from "react-router-dom";
import AvatarContainer from "../../../components/AvatarContainer/AvatarContainer";

function SitesLink() {
  const { protocolId } = useParams();

  const [sites, setSites] = useState([]);
  const [protocolSites, setProtocolSites] = useState([]);
  const [showAddSiteModal, setShowAddSiteModal] = useState(false);

  useEffect(() => {
    fetchProtocolSites();
    fetchSites();
  }, []);

  async function fetchProtocolSites() {
    try {
      const res = await privateClient({
        url: `protocols/${protocolId}/sites?page=1`,
        method: "get",
      });
      setProtocolSites(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSites() {
    try {
      const res = await privateClient({
        url: "sites?page=1",
        method: "get",
      });
      setSites(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddProtocolSite(id) {
    try {
      await privateClient({
        url: `protocols/${protocolId}/sites`,
        method: "post",
        data: {
          siteId: id,
        },
      });

      fetchProtocolSites();
    } catch (error) {
      console.log(error);
    }
  }

  const getAvailableSites = () => {
    const protocolSiteIds = protocolSites.map((item) => item.id);
    return sites.filter((item) => !protocolSiteIds.includes(item.id));
  };

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
