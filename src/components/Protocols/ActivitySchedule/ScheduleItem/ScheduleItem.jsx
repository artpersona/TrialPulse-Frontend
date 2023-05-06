import {
  ClipboardDocumentIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import "../ActivitySchedule.styles.css";
import PropTypes from "prop-types";
import colorPalette from "src/utils/styles/colorPalette";
import { useState } from "react";
import Modal from "src/components/Modal";
import { privateClient } from "../../../../api";
import { useParams } from "react-router-dom";

function ScheduleItem(props) {
  const { protocolId } = useParams();

  const { data } = props;

  const [showViewNoteModal, setShowViewNoteModal] = useState(false);
  const [showEditTreatmentsModal, setShowEditTreatmentsModal] = useState(false);
  const [note, setNote] = useState(data.note || "");
  const [treatments, setTreatments] = useState([]);

  async function handleViewNote() {
    setShowViewNoteModal(true);
  }

  async function handleSaveNote() {
    try {
      const res = await privateClient({
        url: `protocols/${protocolId}/schedules/${data.id}`,
        method: "put",
        data: {
          ...data,
          note,
        },
      });
      console.log(res);
      setShowViewNoteModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <tr>
        <td className="left">Week {data.weekNumber}</td>
        <td>
          <input type="checkbox" checked={data.isVisit} />
        </td>
        <td>
          <input type="checkbox" checked={data.isScreening} />
        </td>
        <td>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => handleViewNote(data)}
          >
            {data.note.length > 0 ? (
              <ClipboardDocumentIcon
                height={20}
                width={20}
                color={colorPalette.SECONDARY_COLOR}
              />
            ) : (
              <PlusIcon
                height={20}
                width={20}
                color={colorPalette.SECONDARY_COLOR}
              />
            )}
          </div>
        </td>
        <td className="left">
          <PencilSquareIcon
            height={20}
            width={20}
            color={colorPalette.SECONDARY_COLOR}
          />
        </td>
      </tr>

      {showViewNoteModal ? (
        <Modal>
          <div className="note__modal">
            <div className="note__modalHeader">
              <div
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  backgroundColor: colorPalette.GRAY,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <ClipboardDocumentIcon height={20} width={20} color="#FFFFFF" />
              </div>
              <h3>Notes</h3>
            </div>
            <textarea
              rows="5"
              style={{ width: "100%", borderRadius: 15, padding: 10 }}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="modal__actions">
              <button
                className="modal_button bg-primary"
                onClick={handleSaveNote}
              >
                Save
              </button>
              <button
                className="modal-button bg-gray-dark"
                onClick={() => setShowViewNoteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      ) : null}

      {showEditTreatmentsModal ? (
        <Modal>
          <div className="note__modal">
            <div className="note__modalHeader">
              <h4 className="modal__title">Add/Remove Treatments</h4>
            </div>

            <div className="modal__actions">
              <button className="modal-button bg-primary">Save</button>
              <button
                className="modal-button bg-gray-dark"
                onClick={() => setShowViewNoteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default ScheduleItem;

ScheduleItem.propTypes = {
  data: PropTypes.object,
};
