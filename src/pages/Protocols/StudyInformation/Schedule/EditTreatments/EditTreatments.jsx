import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { privateClient } from "src/api";

import colorPalette from "src/utils/styles/colorPalette";

import Modal from "src/components/Modal/Modal";
import Treatment from "src/components/Protocols/Treatment/Treatment";

import "./EditTreatments.styles.css";

function EditTreatments() {
  const { protocolId } = useParams();

  const [treatments, setTreatments] = useState([]);
  const [title, setTitle] = useState("");
  const [showAddTreatmentModal, setShowAddTreatmentModal] = useState(false);

  useEffect(() => {
    fetchTreatments();
  }, []);

  async function fetchTreatments() {
    try {
      const res = await privateClient({
        url: `protocols/${protocolId}/treatments?page=1`,
        method: "get",
      });
      setTreatments(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddTreatment() {
    try {
      await privateClient({
        url: `protocols/${protocolId}/treatments`,
        method: "post",
        data: {
          title,
        },
      });

      setShowAddTreatmentModal(false);
      fetchTreatments();
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteTreatment(id) {
    try {
      await privateClient({
        url: `protocols/${protocolId}/treatments/${id}`,
        method: "delete",
      });
      fetchTreatments();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="editTreatments">
      <div className="schedule__header">
        <button
          className="mr-5"
          style={{ backgroundColor: colorPalette.SECONDARY_COLOR }}
          onClick={() => setShowAddTreatmentModal(true)}
        >
          Add Treatment
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        {treatments.map((item) => (
          <Treatment
            key={item.id}
            data={item}
            onDelete={handleDeleteTreatment}
          />
        ))}
      </div>
      {/* <div
        className="editTreatments__addButton"
        style={{ backgroundColor: colorPalette.SECONDARY_COLOR }}
        onClick={() => setShowAddTreatmentModal((prevValue) => !prevValue)}
      >
        <PlusIcon width={25} height={25} color="#FFFFFF" />
      </div> */}

      {showAddTreatmentModal ? (
        <Modal>
          <div className="editTreatments__modal">
            <h4 className="modal__title">Add Treatment</h4>

            <p>Treatment Name</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="modal__actions">
              <button
                className="modal-button bg-primary"
                onClick={handleAddTreatment}
              >
                Save
              </button>
              <button
                className="modal-button bg-gray-dark"
                onClick={() => setShowAddTreatmentModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default EditTreatments;
