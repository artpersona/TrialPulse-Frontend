function FormCol({ children, label }) {
  return (
    <div className="flex-1">
      <p className="text-sm ml-2 mb-1">{label}</p>
      {children}
    </div>
  );
}

export default FormCol;

import PropTypes from "prop-types";

FormCol.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string,
};
