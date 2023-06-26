import { XCircleIcon } from "@heroicons/react/24/solid";
import "./Criteria.styles.css";
import PropTypes from "prop-types";

function Criteria(props) {
  const { data, onDelete } = props;

  return (
    <div className="card w-[400px] p-4 my-4">
      <div className="flex items-center justify-end">
        <XCircleIcon
          height={25}
          width={25}
          color="red"
          style={{ cursor: "pointer" }}
          onClick={() => onDelete(data.id)}
        />
      </div>

      <div className="form-row">
        <p className="form-label">Criteria Name</p>
        <input className="form-input" value={data.name} />
      </div>

      <div className="form-row">
        <p className="form-label">Description</p>
        <textarea value={data.description} className="form-input" rows={3} />
      </div>

      <div className="flex items-center justify-between text-sm">
        <p>Required for Eligibility?</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <input type="radio" checked={data.isRequired} />
            <span>Yes</span>
          </div>
          <div className="flex items-center gap-1">
            <input type="radio" checked={!data.isRequired} />
            <span>No</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <p>Required other criteria for Eligibility?</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <input type="radio" checked={data.isDependent} />
            <span>Yes</span>
          </div>
          <div className="flex items-center gap-1">
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
