import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { privateClient } from "src/api";
import useGetSponsor from "src/api/sponsors/useGetSponsor";
import useGetProtocol from "src/api/protocols/useGetProtocol";

import { useAuthContext } from "src/contexts/AuthContext";

import "./GeneralInfo.styles.css";

function GeneralInfo() {
  const { protocolId } = useParams();

  const { api, protocol } = useGetProtocol(protocolId);
  const { userDetails } = useAuthContext();
  const { sponsorId } = userDetails;

  const { api: apiSponsorAdmin, sponsor: sponsorAdmin } =
    useGetSponsor(sponsorId);
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetchSponsors();
  }, []);

  async function fetchSponsors() {
    try {
      const res = await privateClient({
        url: `/sponsors?page=1`,
      });
      setSponsors(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (api.isLoading) {
    return <div>Loading..</div>;
  }

  if (sponsorId) {
    if (apiSponsorAdmin.isLoading) {
      return <div>Loading..</div>;
    }
  }

  return (
    <div className="generalInfo">
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>General Info</h2>

      <div className="generalInfo__section">
        <p>Study Name</p>
        <input value={protocol.title} readOnly />
        <p>Sponsor</p>

        {userDetails.roleId === 3 || userDetails.roleId === 4 ? (
          <select value={sponsorAdmin.id}>
            <option value="">{sponsorAdmin.name}</option>
          </select>
        ) : (
          <select value={protocol.sponsorId}>
            {sponsors?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div
        style={{
          width: "100%",
          height: 1,
          background: "gray",
          margin: "20px 0",
        }}
      />

      <div className="generalInfo__section">
        <p>Eligibility Overview</p>
        <textarea value={protocol.eligibilityOverview} />
      </div>

      <div
        style={{
          width: "100%",
          height: 1,
          background: "gray",
          margin: "20px 0",
        }}
      />

      <div className="generalInfo__section">
        <p>Active on App</p>
        <select>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}

export default GeneralInfo;
