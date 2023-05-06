import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "src/components/Modal/Modal";

function AddCriteria(props) {
  const { onOk, onCancel } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isRequired, setIsRequired] = useState(true);
  const [isDependent, setIsDependent] = useState(true);

  function handleSave() {
    onOk({
      name,
      description,
      isRequired,
      isDependent,
    });
  }

  return (
    <Modal>
      <div className="eligibilityCriteria__modal">
        <h4 className="modal__title">Add Criteria</h4>
        <div className="criteria">
          <p>Criteria Name</p>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <p>Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="eligibility__row">
            <p>Required for Eligibility?</p>
            <div className="row">
              <div className="radio__button">
                <input
                  type="radio"
                  checked={isRequired}
                  onChange={() => setIsRequired(true)}
                />
                <span>Yes</span>
              </div>
              <div className="radio__button">
                <input
                  type="radio"
                  checked={!isRequired}
                  onChange={() => setIsRequired(false)}
                />
                <span>No</span>
              </div>
            </div>
          </div>

          <div className="eligibility__row">
            <p>Required other criteria for Eligibility?</p>
            <div className="row">
              <div className="radio__button">
                <input
                  type="radio"
                  checked={isDependent}
                  onChange={() => setIsDependent(true)}
                />
                <span>Yes</span>
              </div>
              <div className="radio__button">
                <input
                  type="radio"
                  checked={!isDependent}
                  onChange={() => setIsDependent(false)}
                />
                <span>No</span>
              </div>
            </div>
          </div>
        </div>
        <div className="modal__actions">
          <button className="modal-button bg-primary" onClick={handleSave}>
            Save
          </button>
          <button className="modal-button bg-gray-dark" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddCriteria;

AddCriteria.propTypes = {
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};
