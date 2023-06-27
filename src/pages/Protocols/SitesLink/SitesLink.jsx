import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

import { privateClient } from "src/api";

import Modal from "src/components/Modal/Modal";
import AddButton from "src/components/AddButton/AddButton";
import SitesLinkComponent from "src/components/Protocols/SitesLink";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";
import { useParams } from "react-router-dom";

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
              {getAvailableSites().map((item) => (
                <div
                  key={item.id}
                  className="card py-2 px-4 flex items-center justify-between my-2"
                >
                  <p>{item.name}</p>
                  <button
                    className="bg-secondary flex gap-2 text-md items-center justify-center px-3 py-1 cursor-pointer rounded-2xl text-white"
                    onClick={() => handleAddProtocolSite(item.id)}
                  >
                    <PlusIcon height={12} width={12} color="#ffffff" /> Add
                  </button>
                </div>
              ))}
            </div>
            <div className="modal__actions">
              <button
                className="modal-button bg-gray-dark"
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
