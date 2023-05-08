import "./AddProtocol.styles.css";
import Drug from "src/assets/images/svgs/Drug.svg";
import Iv from "src/assets/images/svgs/Iv.svg";
import Bandage from "src/assets/images/svgs/Bandage.svg";
import Needle from "src/assets/images/svgs/Needle.svg";
import Surgery from "src/assets/images/svgs/Surgery.svg";
import Respirator from "src/assets/images/svgs/Respirator.svg";
import colorPalette from "src/utils/styles/colorPalette";
import { useEffect, useState } from "react";
import BlackNavbar from "../../../components/Protocols/BlackNavbar/BlackNavbar";
import { privateClient } from "../../../api";
import { hasBlank } from "../../../utils";
import { useProtocolContext } from "../../../contexts/ProtocolContext";
import { toast } from "react-hot-toast";

const drugRoutes = [
  {
    id: "drug",
    icon: Drug,
    label: "Oral",
  },
  {
    id: "iv",
    icon: Iv,
    label: "Iv",
  },
  {
    id: "Bandage",
    icon: Bandage,
    label: "Bandage",
  },
  {
    id: "Needle",
    icon: Needle,
    label: "Needle",
  },
  {
    id: "Surgery",
    icon: Surgery,
    label: "Surgery",
  },
  {
    id: "Respirator",
    icon: Respirator,
    label: "Respirator",
  },
];

let notification = "";

function AddProtocol() {
  const { fetchProtocols } = useProtocolContext();

  const [title, setTitle] = useState("");
  const [eligibilityOverview, setEligibilityOverview] = useState("");
  const [sponsorId, setSponsorId] = useState("");
  const [studyNumber, setStudyNumber] = useState("");
  const [studyInfo, setStudyInfo] = useState("");
  const [phase, setPhase] = useState("Phase 1");
  const [drugRoute, setDrugRoute] = useState("");
  const [drugTarget, setDrugTarget] = useState("Active");
  const [drugTreatmentPeriodNumber, setDrugTreatmentPeriodNumber] =
    useState("");
  const [drugTreatmentPeriodDays, setDrugTreatmentPeriodDays] =
    useState("Days");
  const [placebo, setPlacebo] = useState("Yes");
  const [lte, setLte] = useState("");
  const [lteDurationType, setLteDurationType] = useState("Days");
  const [population, setPopulation] = useState("18");
  const [bioNaive, setBioNaive] = useState("Yes");
  const [bioIr, setBioIr] = useState("50");

  const [sponsors, setSponsors] = useState(null);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const isDisabled = () =>
    hasBlank([
      title,
      eligibilityOverview,
      sponsorId,
      studyNumber,
      studyInfo,
      phase,
      drugRoute,
      drugTarget,
      drugTreatmentPeriodNumber,
      drugTreatmentPeriodNumber,
      placebo,
      lte,
      lteDurationType,
      population,
      bioNaive,
      bioIr,
    ]);

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

  async function addProtocol() {
    try {
      notification = toast.loading("Adding Protocol...");
      await privateClient({
        url: "/protocols",
        method: "post",
        data: {
          sponsorId,
          title,
          eligibilityOverview,
          studyNumber,
          studyInfo,
          phase,
          drugRoute,
          drugTarget,
          drugTreatmentPeriod: `${drugTreatmentPeriodNumber} ${drugTreatmentPeriodDays}`,
          placebo,
          lte,
          lteDurationType,
          population,
          bioNaive,
          bioIr,
        },
      });
      resetState();
      fetchProtocols();
      toast.success("Protocol has been added successfully.", {
        id: notification,
      });
    } catch (error) {
      toast.error(error, {
        id: notification,
      });
    }
  }

  function resetState() {
    setSponsorId("");
    setTitle("");
    setEligibilityOverview("");
    setStudyNumber("");
    setStudyInfo("");
    setPhase("Phase 1");
    setDrugRoute("");
    setDrugTarget("Active");
    setDrugTreatmentPeriodNumber("");
    setDrugTreatmentPeriodDays("");
    setPlacebo("Yes");
    setLte("");
    setLteDurationType("Days");
    setPopulation("18");
    setBioNaive("Yes");
    setBioIr("50");
  }
  return (
    <div>
      <BlackNavbar></BlackNavbar>
      {/* GENERAL INFO */}

      <div className="generalInfo">
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>General Info</h2>

        <div className="generalInfo__section">
          <p>Study Name</p>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <p>Sponsor</p>
          <select
            value={sponsorId}
            onChange={(e) => setSponsorId(e.target.value)}
          >
            <option value="">Select Sponsor</option>
            {sponsors?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
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
          <textarea
            value={eligibilityOverview}
            onChange={(e) => setEligibilityOverview(e.target.value)}
          />
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

      {/* STUDY DETAILS */}
      <div className="studyDetails">
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Study Details</h2>

        <p>Study Number</p>
        <input
          value={studyNumber}
          onChange={(e) => setStudyNumber(e.target.value)}
        />

        <p>Study Details Info</p>
        <textarea
          value={studyInfo}
          onChange={(e) => setStudyInfo(e.target.value)}
        />

        <p>Phase</p>
        <select value={phase} onChange={(e) => setPhase(e.target.value)}>
          <option value="Phase 1">Phase 1</option>
          <option value="Phase 2">Phase 2</option>
          <option value="Phase 3">Phase 3</option>
          <option value="Phase 4">Phase 4</option>
        </select>

        <p>Drug Route</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 10,
          }}
        >
          {drugRoutes.map(({ id, icon, label }) => (
            <div
              key={id}
              style={{
                width: 60,
                height: 35,
                border: "1px solid black",
                display: "grid",
                placeItems: "center",
                borderRadius: 5,
                backgroundColor:
                  label === drugRoute
                    ? colorPalette.SECONDARY_COLOR
                    : "#FFFFFF",
              }}
              onClick={() => setDrugRoute(label)}
            >
              <img src={icon} />
            </div>
          ))}
        </div>

        <p>Drug Target</p>
        <select
          value={drugTarget}
          onChange={(e) => setDrugTarget(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <p>Drug Treatment Period</p>
        <div style={{ display: "flex", gap: 20 }}>
          <input
            value={drugTreatmentPeriodNumber}
            onChange={(e) => setDrugTreatmentPeriodNumber(e.target.value)}
          />
          <select
            value={drugTreatmentPeriodDays}
            onChange={(e) => setDrugTreatmentPeriodDays(e.target.value)}
          >
            <option value="Days">Days</option>
            <option value="Weeks">Weeks</option>
          </select>
        </div>

        <p>Placebo</p>
        <select value={placebo} onChange={(e) => setPlacebo(e.target.value)}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <p>LTE</p>
        <div style={{ display: "flex", gap: 20 }}>
          <input value={lte} onChange={(e) => setLte(e.target.value)} />

          <select
            value={lteDurationType}
            onChange={(e) => setLteDurationType(e.target.value)}
          >
            <option value="Days">Days</option>
            <option value="Weeks">Weeks</option>
          </select>
        </div>

        <p>Population</p>
        <select
          value={population}
          onChange={(e) => setPopulation(e.target.value)}
        >
          <option value="18">Mov-Sev CD</option>
        </select>

        <p>Bio-naive</p>
        <select value={bioNaive} onChange={(e) => setBioNaive(e.target.value)}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <p>Bio-IR (min%)</p>
        <select value={bioIr} onChange={(e) => setBioIr(e.target.value)}>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className="addProtocol__buttonContainer">
        <button
          className="addProtocol__button"
          style={{ backgroundColor: colorPalette.SECONDARY_COLOR }}
          disabled={isDisabled()}
          onClick={addProtocol}
        >
          Add Protocol
        </button>
      </div>
    </div>
  );
}

export default AddProtocol;
