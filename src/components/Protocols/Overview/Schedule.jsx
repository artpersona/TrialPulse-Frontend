import OverviewSection from "./OverviewSection";

const activitySchedule = [
  {
    id: "",
    label: "Number of Weeks",
  },
  {
    id: "",
    label: "Number of Visits",
  },
  {
    id: "",
    label: "Number of Tests",
  },
  {
    id: "",
    label: "Number of Procedures",
  },
];

function Schedule() {
  return (
    <OverviewSection title="Schedule of Activity">
      {activitySchedule.map(({ id, label }) => (
        <div key={id} className="row">
          <p>{label}</p>
          <p>120</p>
        </div>
      ))}
    </OverviewSection>
  );
}

export default Schedule;
