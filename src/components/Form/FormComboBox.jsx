function FormComboBox(props) {
  const {
    options,
    value,
    onChange,
    showBox,
    handleSelect,
    handleOpenBox,
    handleCloseBox,
    required,
    ...others
  } = props;

  return (
    <div className="relative w-full">
      <input
        className="w-full rounded-3xl py-3 px-4"
        type="text"
        value={value}
        onChange={onChange}
        onClick={handleOpenBox}
        required={required}
      />
      {options.length && showBox > 0 ? (
        <div className="absolute top-12 left-0 bg-white w-full border border-gray-400 rounded-md">
          {options.map((item) => (
            <div
              className="has-transition text-sm p-2 cursor-pointer hover:bg-gray-200"
              key={item.id}
              onClick={() => handleSelect(item.id, item.name)}
            >
              {item.label || item.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default FormComboBox;

import PropTypes from "prop-types";

FormComboBox.propTypes = {
  required: PropTypes.bool,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  showBox: PropTypes.bool,
  handleSelect: PropTypes.func,
  handleOpenBox: PropTypes.func,
  handleCloseBox: PropTypes.func,
};
