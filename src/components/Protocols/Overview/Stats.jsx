import OverviewSection from "./OverviewSection";

const studyStats = [
  {
    id: "",
    label: "Total Criteria Options",
  },
  {
    id: "",
    label: "Number of Sites",
  },
  {
    id: "",
    label: "Number of Staff (all site)",
  },
  {
    id: "",
    label: "Total Consented",
  },
  {
    id: "",
    label: "Total Enrolled",
  },
  {
    id: "",
    label: "Total Committed",
  },
  {
    id: "",
    label: "Number of PDFs",
  },
  {
    id: "",
    label: "Number of Images",
  },
  {
    id: "",
    label: "Number of Other",
  },
];

function Stats() {
  return (
    <OverviewSection title="Study Stats">
      {studyStats.map(({ id, label }) => (
        <div key={id} className="row">
          <p>{label}</p>
          <p>120</p>
        </div>
      ))}
    </OverviewSection>
  );
}

export default Stats;
