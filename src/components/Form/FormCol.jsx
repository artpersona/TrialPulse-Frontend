function FormCol({ children, label, error }) {
  return (
    <div className={`flex-1 group ${error ? "has-error" : ""}`}>
      <p className="text-sm ml-2 mb-1">{label}</p>
      {children}
<<<<<<< HEAD
      {error && <p className="text-xs text-red-500 mx-3">{error.message}</p>}
=======
      {error && <p className="form-error text-red-500 mx-3 text-sm">{error}</p>}
>>>>>>> 9177fab0c3507943f00566bfa567abcc51f407f1
    </div>
  );
}

export default FormCol;

import PropTypes from "prop-types";

FormCol.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string,
<<<<<<< HEAD
  error: PropTypes.object,
=======
  error: PropTypes.string,
>>>>>>> 9177fab0c3507943f00566bfa567abcc51f407f1
};
