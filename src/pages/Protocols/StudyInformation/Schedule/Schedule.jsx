import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { privateClient } from "src/api";

import colorPalette from "src/utils/styles/colorPalette";

import Modal from "src/components/Modal/Modal";
import ActivitySchedule from "src/components/Protocols/ActivitySchedule";

import "./Schedule.styles.css";

function Schedule() {
  const { protocolId } = useParams();

  const navigate = useNavigate();

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
          className="mr-5"
          style={{ backgroundColor: colorPalette.SECONDARY_COLOR }}
          onClick={() => setAddScheduleModalOpen(true)}
        >
          Add Schedule
        </button>

        <button
          style={{ backgroundColor: colorPalette.PRIMARY_COLOR }}
          onClick={handleEditTreatments}
        >
          Edit Treatments
        </button>
      </div>
      <ActivitySchedule data={schedule} />

      {/* <FloatingPlusButton handleClick={() => setAddScheduleModalOpen(true)} /> */}

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

            <div className="flex flex-col gap-3 justify-center items-center pt-4">
              <button
                className="modal-cancel"
                onClick={() => setAddScheduleModalOpen(false)}
              >
                Cancel
              </button>
              <button className="modal-proceed" onClick={handleAddSchedule}>
                Save
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default Schedule;
