import { forwardRef } from "react";

const FormSwitch = forwardRef(function FormTextArea(props, ref) {
  return (
    <label class="switch">
      <input type="checkbox" />
      <span class="slider round"></span>
    </label>
  );
});

export default FormSwitch;
