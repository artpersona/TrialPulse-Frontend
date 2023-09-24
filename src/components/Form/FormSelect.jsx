import { forwardRef } from "react";

// const FormSelect = forwardRef(function FormSelect(props, ref) {

// function FormSelect(props) {
const FormSelect = forwardRef(function FormSelect(props, ref) {
  const { options, defaultValue, ...others } = props;
  return (
    <select className="w-full rounded-3xl py-3 px-4" {...others} ref={ref}>
      {defaultValue ? (
        <option value={defaultValue}>{defaultValue.name}</option>
      ) : <option value="">Select option</option>}
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

const sponsorPropTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  cmo: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  contactPersonName: PropTypes.string.isRequired,
  contactPersonEmail: PropTypes.string.isRequired,
  contactPersonNumber1: PropTypes.string.isRequired,
  contactPersonNumber2: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  viewedAt: PropTypes.string.isRequired,
};

FormSelect.propTypes = {
  options: PropTypes.array,
  defaultValue: sponsorPropTypes,
};
