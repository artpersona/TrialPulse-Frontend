function FormCol({ children, label, error }) {
  return (
    <div className={`flex-1 group ${error ? "has-error" : ""}`}>
      <p className="text-sm ml-2 mb-1">{label}</p>
      {children}
      {error && <p className="text-xs text-red-500 mx-3">{error.message}</p>}
    </div>
  );
}

export default FormCol;

import PropTypes from "prop-types";

FormCol.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string,
  error: PropTypes.object,
};
