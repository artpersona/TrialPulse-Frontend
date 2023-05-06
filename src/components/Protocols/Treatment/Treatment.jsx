import PropTypes from "prop-types";
import "./Treatment.styles.css";
import { XMarkIcon } from "@heroicons/react/24/solid";

function Treatment(props) {
  const { data, onDelete } = props;

  return (
    <div className="treatment">
      <p>{data.title}</p>
      <XMarkIcon
        width={25}
        height={25}
        color={"red"}
        style={{ cursor: "pointer" }}
        onClick={() => onDelete(data.id)}
      />
    </div>
  );
}

export default Treatment;

Treatment.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func,
};
