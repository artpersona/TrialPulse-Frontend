import OverviewSection from "./OverviewSection";

const activitySchedule = [
  {
    id: "1",
    label: "Number of Weeks",
  },
  {
    id: "2",
    label: "Number of Visits",
  },
  {
    id: "3",
    label: "Number of Tests",
  },
  {
    id: "4",
    label: "Number of Procedures",
  },
];

function Schedule() {
  return (
    <OverviewSection title="Schedule of Activity">
      {activitySchedule.map(({ label }) => (
        <div key={label} className="row">
          <p>{label}</p>
          <p>120</p>
        </div>
      ))}
    </OverviewSection>
  );
}

export default Schedule;
