import "./GeneralInfo.styles.css";

function GeneralInfo(props) {
  const { data } = props;

  return (
    <div className="generalInfo">
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>General Info</h2>

      <div className="generalInfo__section">
        <p>Study Name</p>
        <input value={data.title} readOnly />
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
        <textarea value={data.eligibilityOverview} />
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
