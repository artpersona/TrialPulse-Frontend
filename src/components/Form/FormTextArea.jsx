import { forwardRef } from "react";

const FormTextArea = forwardRef(function FormTextArea(props, ref) {
  return (
    <textarea
      ref={ref}
      className="w-full rounded-2xl py-3 px-4"
      {...props}
      rows={4}
    />
  );
});

export default FormTextArea;
