import "./Criteria.styles.css";

function Criteria() {
  return (
    <div className="criteria">
      <p>Criteria Name</p>
      <input />

      <p>Description</p>
      <textarea></textarea>

      <div className="eligibility__row">
        <p>Required for Eligibility?</p>
        <div className="row">
          <div className="radio__button">
            <input type="radio" />
            <p>Yes</p>
          </div>
          <div className="radio__button">
            <input type="radio" />
            <p>No</p>
          </div>
        </div>
      </div>

      <div className="eligibility__row">
        <p>Required other criteria for Eligibility?</p>
        <div className="row">
          <div className="radio__button">
            <input type="radio" />
            <p>Yes</p>
          </div>
          <div className="radio__button">
            <input type="radio" />
            <p>No</p>
          </div>
        </div>
      </div>

      <p>Select criteria</p>
      <select></select>
    </div>
  );
}

export default Criteria;
