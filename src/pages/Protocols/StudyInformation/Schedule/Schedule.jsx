import { useEffect, useState } from "react";
import "./Schedule.styles.css";
import ActivitySchedule from "src/components/Protocols/ActivitySchedule";
import { useProtocolContext } from "src/contexts/ProtocolContext";
import { privateClient } from "src/api";
import { PlusIcon } from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette";
import Modal from "../../../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import FloatingPlusButton from "../../../../components/FloatingPlusButton/FloatingPlusButton";

function Schedule() {
  const navigate = useNavigate();

  const { getSelectedProtocol } = useProtocolContext();

  const protocolId = getSelectedProtocol().id;
  const [schedule, setSchedule] = useState([]);
  const [addScheduleModalOpen, setAddScheduleModalOpen] = useState(false);
  const [isVisit, setIsVisit] = useState(false);
  const [isScreening, setIsScreening] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    fetchSchedules();
  }, []);

  async function fetchSchedules() {
    try {
      const res = await privateClient({
        url: `protocols/${protocolId}/schedules?page=1`,
      });
      setSchedule(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddSchedule() {
    try {
      await privateClient({
        url: `protocols/${protocolId}/schedules`,
        method: "post",
        data: {
          weekNumber: getWeekNumber(),
          isVisit,
          isScreening,
          note,
        },
      });

      setAddScheduleModalOpen(false);
      fetchSchedules();
    } catch (error) {
      console.log(error);
    }
  }

  const getWeekNumber = () => schedule.length + 1;

  function handleEditTreatments() {
    navigate("edit-treatments");
  }

  return (
    <div className="schedule">
      <div className="schedule__header">
        <button
          style={{ backgroundColor: colorPalette.SECONDARY_COLOR }}
          onClick={handleEditTreatments}
        >
          Edit Treatments
        </button>
      </div>
      <ActivitySchedule data={schedule} />

      <FloatingPlusButton handleClick={() => setAddScheduleModalOpen(true)} />

      {addScheduleModalOpen ? (
        <Modal>
          <div className="schedule__modal">
            <h4 style={{ textAlign: "center", fontSize: 24, marginBottom: 20 }}>
              Week {getWeekNumber()}
            </h4>
            <div className="schedule__row">
              <div className="schedule__checkbox">
                <input
                  type="checkbox"
                  value={isVisit}
                  checked={isVisit}
                  onChange={(e) => setIsVisit(e.target.checked)}
                />
                <p>Visit</p>
              </div>
              <div className="schedule__checkbox">
                <input
                  type="checkbox"
                  value={isScreening}
                  checked={isScreening}
                  onChange={(e) => setIsScreening(e.target.checked)}
                />
                <p>Screening</p>
              </div>
            </div>

            <p>Notes</p>
            <textarea
              rows={5}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="modal__actions">
              <button
                className="modal-button bg-primary"
                onClick={handleAddSchedule}
              >
                Save
              </button>
              <button
                className="modal-button bg-gray-dark"
                onClick={() => setAddScheduleModalOpen(false)}
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

export default Schedule;
