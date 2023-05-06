import { useEffect, useState } from "react";
import "./SitesLink.styles.css";
import SitesLinkComponent from "src/components/Protocols/SitesLink";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";
import { useProtocolContext } from "src/contexts/ProtocolContext";
import { privateClient } from "src/api";
import FloatingPlusButton from "src/components/Protocols/FloatingPlusButton/FloatingPlusButton";
import Modal from "../../../components/Modal/Modal";
import { PlusIcon } from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette";

function SitesLink() {
  const { getSelectedProtocol } = useProtocolContext();

  const protocolId = getSelectedProtocol().id;

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
      {protocolSites.map((item) => (
        <SitesLinkComponent key={item.id} data={item} />
      ))}

      <FloatingPlusButton handleClick={() => setShowAddSiteModal(true)} />

      {showAddSiteModal ? (
        <Modal>
          <div className="sitesLink__modal">
            <h4 className="modal__title">Add Site</h4>
            <div>
              {getAvailableSites().map((item) => (
                <div key={item.id} className="sitesLink__site">
                  <p>{item.name}</p>
                  <button
                    style={{ backgroundColor: colorPalette.SECONDARY_COLOR }}
                    onClick={() => handleAddProtocolSite(item.id)}
                  >
                    <PlusIcon height={12} width={12} color="#ffffff" /> Add
                  </button>
                </div>
              ))}
            </div>
            <div className="modal__actions">
              <button
                className="modal__cancelButton"
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
