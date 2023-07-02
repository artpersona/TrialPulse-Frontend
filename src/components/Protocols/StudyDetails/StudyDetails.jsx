import "./StudyDetails.styles.css";
import { useParams } from "react-router-dom";
import useGetProtocol from "../../../api/protocols/useGetProtocol";
import { drugRoutes } from "../../../shared/constants";
import FormRow from "../../Form/FormRow";
import FormCol from "../../Form/FormCol";
import FormInput from "../../Form/FormInput";
import FormTextArea from "../../Form/FormTextArea";
import FormSelect from "../../Form/FormSelect";

const timeframes = [
  {
    id: "Days",
    name: "Days",
  },
  {
    id: "Weeks",
    name: "Weeks",
  },
];

const booleans = [
  {
    id: "Yes",
    name: "Yes",
  },
  {
    id: "No",
    name: "No",
  },
];

const populations = [
  {
    id: "18",
    name: "Mov-Sev CD",
  },
];

const bionaives = [
  {
    id: "50",
    name: "50",
  },
  {
    id: "100",
    name: "100",
  },
];

function StudyDetails() {
  const { protocolId } = useParams();

  const { api, protocol } = useGetProtocol(protocolId);

  if (api.isLoading) {
    return <div>Loading.. </div>;
  }

  return (
    <div className="studyDetails">
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Study Details</h2>

      {/* <p>Study Number</p>
      <input readOnly value={protocol.studyNumber} /> */}

      <FormRow>
        <FormCol label="Study Number">
          <FormInput readOnly value={protocol.studyNumber} />
        </FormCol>
      </FormRow>

      {/* <p>Study Details Info</p>
      <textarea value={protocol.studyInfo} /> */}

      <FormRow>
        <FormCol label="Study Details Info">
          <FormTextArea value={protocol.studyInfo} />
        </FormCol>
      </FormRow>

      {/* <p>Phase</p>
      <select>
        <option value="">{protocol.phase}</option>
      </select> */}

      <FormRow>
        <FormCol label="Phase">
          <FormSelect
            value={protocol.phase}
            options={[{ id: protocol.phase, name: protocol.phase }]}
          />
        </FormCol>
      </FormRow>

      {/* <p>Drug Route</p>
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
      </div> */}

      <FormRow>
        <FormCol label="Drug Route">
          <FormSelect
            value={protocol.drugRoute}
            options={drugRoutes.map((item) => ({ id: item, name: item }))}
          />
        </FormCol>
      </FormRow>

      {/* <p>Drug Target</p>
      <select></select> */}
      {/* 
      <FormRow>
            <FormCol label="Drug Target" >
              <FormSelect  />
            </FormCol>
          </FormRow> */}

      {/* <p>Drug Treatment Period</p>
      <div style={{ display: "flex", gap: 20 }}>
        <input readOnly value={protocol.drugTreatmentPeriod.split(" ")[0]} />
        <select disabled value={protocol.drugTreatmentPeriod.split(" ")[1]}>
          <option value="Days">Days</option>
          <option value="Weeks">Weeks</option>
        </select>
      </div> */}

      <FormRow>
        <FormCol label="Drug Treatment Period">
          <FormInput
            readOnly
            value={protocol.drugTreatmentPeriod.split(" ")[0]}
          />
        </FormCol>

        <FormCol label=" ">
          <FormSelect
            disabled
            value={protocol.drugTreatmentPeriod.split(" ")[1]}
            options={timeframes}
          />
        </FormCol>
      </FormRow>

      {/* <p>Placebo</p>
      <select disabled value={protocol.placebo}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select> */}

      <FormRow>
        <FormCol label="Placebo">
          <FormSelect options={booleans} disabled value={protocol.placebo} />
        </FormCol>
      </FormRow>

      {/* <p>LTE</p>
      <div style={{ display: "flex", gap: 20 }}>
        <input readOnly value={protocol.lte} />

        <select disabled value={protocol.lteDurationType}>
          <option value="Days">Days</option>
          <option value="Weeks">Weeks</option>
        </select>
      </div> */}

      <FormRow>
        <FormCol label="LTE">
          <FormInput readOnly value={protocol.lte} />
        </FormCol>

        <FormCol label=" ">
          <FormSelect
            options={timeframes}
            disabled
            value={protocol.lteDurationType}
          />
        </FormCol>
      </FormRow>
      {/* 
      <p>Population</p>
      <select></select> */}

      <FormRow>
        <FormCol label="Population">
          <FormSelect options={populations} value={protocol.population} />
        </FormCol>
      </FormRow>
      {/* <p>Bio-naive</p>
      <select disabled value={protocol.bioNaive}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select> */}

      <FormRow>
        <FormCol label="Bio-naive">
          <FormSelect options={booleans} disabled value={protocol.bioNaive} />
        </FormCol>
      </FormRow>

      {/* <p>Bio-IR (min%)</p>
      <select disabled value={protocol.bioIr}>
        <option value="1">Yes</option>
        <option value="0">No</option>
      </select> */}

      <FormRow>
        <FormCol label="Bio-IR (min%)">
          <FormSelect options={bionaives} disabled value={protocol.bioIr} />
        </FormCol>
      </FormRow>
    </div>
  );
}

export default StudyDetails;
