import PropTypes from "prop-types";
import "./StudyDetails.styles.css";
import Drug from "src/assets/images/svgs/Drug.svg";
import Iv from "src/assets/images/svgs/Iv.svg";
import Bandage from "src/assets/images/svgs/Bandage.svg";
import Needle from "src/assets/images/svgs/Needle.svg";
import Surgery from "src/assets/images/svgs/Surgery.svg";
import Respirator from "src/assets/images/svgs/Respirator.svg";
import colorPalette from "src/utils/styles/colorPalette";

const drugRoutes = [
  {
    id: "drug",
    icon: Drug,
    label: "Oral",
  },
  {
    id: "iv",
    icon: Iv,
  },
  {
    id: "Bandage",
    icon: Bandage,
  },
  {
    id: "Needle",
    icon: Needle,
  },
  {
    id: "Surgery",
    icon: Surgery,
  },
  {
    id: "Respirator",
    icon: Respirator,
  },
];

function StudyDetails(props) {
  const { data } = props;

  return (
    <div className="studyDetails">
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Study Details</h2>

      <p>Study Number</p>
      <input readOnly value={data.studyNumber} />

      <p>Study Details Info</p>
      <textarea value={data.studyInfo} />

      <p>Phase</p>
      <select>
        <option value="">{data.phase}</option>
      </select>

      <p>Drug Route</p>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 10 }}
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
                label === data.drugRoute
                  ? colorPalette.SECONDARY_COLOR
                  : "#FFFFFF",
            }}
          >
            <img src={icon} />
          </div>
        ))}
      </div>

      <p>Drug Target</p>
      <select></select>

      <p>Drug Treatment Period</p>
      <div style={{ display: "flex", gap: 20 }}>
        <input readOnly value={data.drugTreatmentPeriod.split(" ")[0]} />
        <select disabled value={data.drugTreatmentPeriod.split(" ")[1]}>
          <option value="Days">Days</option>
          <option value="Weeks">Weeks</option>
        </select>
      </div>

      <p>Placebo</p>
      <select disabled value={data.placebo}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <p>LTE</p>
      <div style={{ display: "flex", gap: 20 }}>
        <input readOnly value={data.lte} />

        <select disabled value={data.lteDurationType}>
          <option value="Days">Days</option>
          <option value="Weeks">Weeks</option>
        </select>
      </div>

      <p>Population</p>
      <select></select>

      <p>Bio-naive</p>
      <select disabled value={data.bioNaive}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <p>Bio-IR (min%)</p>
      <select disabled value={data.bioIr}>
        <option value="1">Yes</option>
        <option value="0">No</option>
      </select>
    </div>
  );
}

export default StudyDetails;

StudyDetails.propTypes = {
  data: PropTypes.object,
};
