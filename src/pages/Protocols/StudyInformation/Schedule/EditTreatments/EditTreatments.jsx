import { useEffect, useState } from "react";
import "./EditTreatments.styles.css";
import { privateClient } from "../../../../../api";
import { useProtocolContext } from "../../../../../contexts/ProtocolContext";
import { PlusIcon } from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette";
import Modal from "../../../../../components/Modal/Modal";
import Treatment from "../../../../../components/Protocols/Treatment/Treatment";

function EditTreatments() {
  const { getSelectedProtocol } = useProtocolContext();

  const protocolId = getSelectedProtocol().id;

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
      <div>
        {treatments.map((item) => (
          <Treatment
            key={item.id}
            data={item}
            onDelete={handleDeleteTreatment}
          />
        ))}
      </div>
      <div
        className="editTreatments__addButton"
        style={{ backgroundColor: colorPalette.SECONDARY_COLOR }}
        onClick={() => setShowAddTreatmentModal((prevValue) => !prevValue)}
      >
        <PlusIcon width={25} height={25} color="#FFFFFF" />
      </div>

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
              <button className="modal__okButton" onClick={handleAddTreatment}>
                Save
              </button>
              <button
                className="modal__cancelButton"
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
