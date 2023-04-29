import "./GeneralInfo.styles.css";

function GeneralInfo() {
  return (
    <div className="generalInfo">
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>General Info</h2>

      <div className="generalInfo__section">
        <p>Study Name</p>
        <input />
        <p>Sponsor</p>
        <select></select>
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
        <textarea></textarea>
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
        <select></select>
      </div>
    </div>
  );
}

export default GeneralInfo;
