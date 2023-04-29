import "./Overview.styles.css";
import Stats from "./Stats";
import Schedule from "./Schedule";
import Sponsor from "./Sponsor";

function Overview(props) {
  const { title } = props;

  return (
    <div className="overview">
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>{title}</h2>

      <Stats />
      <Schedule />
      <Sponsor />
    </div>
  );
}

export default Overview;
