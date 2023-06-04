function FormRow({ children }) {
  return <div className="flex items-center gap-2 my-2">{children}</div>;
}

export default FormRow;

import PropTypes from "prop-types";

FormRow.propTypes = {
  children: PropTypes.element,
};
