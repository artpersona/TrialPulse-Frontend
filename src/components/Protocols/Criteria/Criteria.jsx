import { XCircleIcon } from "@heroicons/react/24/solid";
import "./Criteria.styles.css";
import PropTypes from "prop-types";

function Criteria(props) {
  const { data, onDelete } = props;

  return (
    <div className="criteria">
      <div className="criteria__header">
        <XCircleIcon
          height={25}
          width={25}
          color="red"
          style={{ cursor: "pointer" }}
          onClick={() => onDelete(data.id)}
        />
      </div>
      <p>Criteria Name</p>
      <input value={data.name} />

      <p>Description</p>
      <textarea value={data.description} />

      <div className="eligibility__row">
        <p>Required for Eligibility?</p>
        <div className="row">
          <div className="radio__button">
            <input type="radio" checked={data.isRequired} />
            <span>Yes</span>
          </div>
          <div className="radio__button">
            <input type="radio" checked={!data.isRequired} />
            <span>No</span>
          </div>
        </div>
      </div>

      <div className="eligibility__row">
        <p>Required other criteria for Eligibility?</p>
        <div className="row">
          <div className="radio__button">
            <input type="radio" checked={data.isDependent} />
            <span>Yes</span>
          </div>
          <div className="radio__button">
            <input type="radio" checked={!data.isDependent} />
            <span>No</span>
          </div>
        </div>
      </div>

      {/* <p>Select criteria</p>
      <select></select> */}
    </div>
  );
}

export default Criteria;

Criteria.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func,
};
