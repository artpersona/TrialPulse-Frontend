import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/solid";

function Treatment(props) {
  const { data, onDelete } = props;

  return (
    <div className="flex justify-between items-center rounded-full px-5  py-3 border border-gray w-[500px] mb-2">
      <p className="text-sm">{data.title}</p>
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
