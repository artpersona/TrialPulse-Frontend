import React from "react";
import "./StudyDetails.styles.css";
import Drug from "src/assets/images/svgs/Drug.svg";
import Iv from "src/assets/images/svgs/Iv.svg";
import Bandage from "src/assets/images/svgs/Bandage.svg";
import Needle from "src/assets/images/svgs/Needle.svg";
import Surgery from "src/assets/images/svgs/Surgery.svg";
import Respirator from "src/assets/images/svgs/Respirator.svg";

const drugRoutes = [
  {
    id: "drug",
    icon: Drug,
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

function StudyDetails() {
  return (
    <div className="studyDetails">
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Study Details</h2>

      <p>Study Number</p>
      <input />

      <p>Study Details Info</p>
      <textarea></textarea>

      <p>Phase</p>
      <select></select>

      <p>Drug Route</p>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 10 }}
      >
        {drugRoutes.map(({ id, icon }) => (
          <div
            key={id}
            style={{
              width: 60,
              height: 35,
              border: "1px solid black",
              display: "grid",
              placeItems: "center",
              borderRadius: 5,
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
        <input />
        <select></select>
      </div>

      <p>Placebo</p>
      <select></select>

      <p>LTE</p>
      <div style={{ display: "flex", gap: 20 }}>
        <input />

        <select></select>
      </div>

      <p>Population</p>
      <select></select>

      <p>Bio-naive</p>
      <select></select>

      <p>Bio-IR (min%)</p>
      <select></select>
    </div>
  );
}

export default StudyDetails;
