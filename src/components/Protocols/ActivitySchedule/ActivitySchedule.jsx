import PropTypes from "prop-types";
import ScheduleItem from "./ScheduleItem/ScheduleItem";

function ActivitySchedule(props) {
  const { data } = props;

  return (
    <>
      <table className="w-full max-w-[800px] mx-auto rounded-full">
        <tbody>
          <tr>
            <th></th>
            <th>Visit</th>
            <th>Screening</th>
            <th>Notes</th>
            <th>Treatments</th>
          </tr>
          {data.map((item) => (
            <ScheduleItem key={item.id} data={item} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ActivitySchedule;

ActivitySchedule.propTypes = {
  data: PropTypes.object,
};
