import "./StudyDetails.styles.css";
import { useParams } from "react-router-dom";
import useGetProtocol from "../../../api/protocols/useGetProtocol";
import { drugRoutes } from "../../../shared/constants";

function StudyDetails() {
  const { protocolId } = useParams();

  const { api, protocol } = useGetProtocol(protocolId);

  if (api.isLoading) {
    return <div>Loading.. </div>;
  }

  return (
    <div className="studyDetails">
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Study Details</h2>

      <p>Study Number</p>
      <input readOnly value={protocol.studyNumber} />

      <p>Study Details Info</p>
      <textarea value={protocol.studyInfo} />

      <p>Phase</p>
      <select>
        <option value="">{protocol.phase}</option>
      </select>

      <p>Drug Route</p>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 10 }}
      >
        <select value={protocol.drugRoute}>
          <option value="">Select Drug Route </option>

          {drugRoutes.map((drug) => (
            <option key={drug} value={drug}>
              {drug}
            </option>
          ))}
        </select>
      </div>

      <p>Drug Target</p>
      <select></select>

      <p>Drug Treatment Period</p>
      <div style={{ display: "flex", gap: 20 }}>
        <input readOnly value={protocol.drugTreatmentPeriod.split(" ")[0]} />
        <select disabled value={protocol.drugTreatmentPeriod.split(" ")[1]}>
          <option value="Days">Days</option>
          <option value="Weeks">Weeks</option>
        </select>
      </div>

      <p>Placebo</p>
      <select disabled value={protocol.placebo}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <p>LTE</p>
      <div style={{ display: "flex", gap: 20 }}>
        <input readOnly value={protocol.lte} />

        <select disabled value={protocol.lteDurationType}>
          <option value="Days">Days</option>
          <option value="Weeks">Weeks</option>
        </select>
      </div>

      <p>Population</p>
      <select></select>

      <p>Bio-naive</p>
      <select disabled value={protocol.bioNaive}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <p>Bio-IR (min%)</p>
      <select disabled value={protocol.bioIr}>
        <option value="1">Yes</option>
        <option value="0">No</option>
      </select>
    </div>
  );
}

export default StudyDetails;
