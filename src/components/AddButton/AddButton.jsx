import { PlusIcon } from "@heroicons/react/24/solid";

function AddButton(props) {
  const { title, onClick } = props;

  return (
    <button
      className="flex items-center gap-1 text-white bg-secondary px-6 py-2 rounded-full hover:bg-secondary-dark mx-auto mb-6"
      onClick={onClick}
    >
      <PlusIcon height={16} width={16} color="#ffffff" />
      {title}
    </button>
  );
}

export default AddButton;

import PropTypes from "prop-types";

AddButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};
