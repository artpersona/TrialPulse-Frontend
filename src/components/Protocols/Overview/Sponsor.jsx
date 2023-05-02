import OverviewSection from "./OverviewSection";

function Sponsor(props) {
  const { sponsors } = props;

  return (
    <OverviewSection title="Sponsor">
      {sponsors?.map(({ id, label }) => (
        <div key={"sponsor" + id} className="row">
          <p>{label}</p>
          <p>120</p>
        </div>
      ))}
    </OverviewSection>
  );
}

export default Sponsor;
