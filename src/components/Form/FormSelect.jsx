import { forwardRef } from "react";

// const FormSelect = forwardRef(function FormSelect(props, ref) {

// function FormSelect(props) {
const FormSelect = forwardRef(function FormSelect(props, ref) {
  const { options, ...others } = props;
  return (
    <select className="w-full rounded-3xl py-3 px-4" {...others} ref={ref}>
      <option value="">Select option</option>
      {options.map((item) => (
        <option key={item.id} value={item.id}>
          {item.label || item.name}
        </option>
      ))}
    </select>
  );
});

export default FormSelect;

import PropTypes from "prop-types";

FormSelect.propTypes = {
  options: PropTypes.array,
};
