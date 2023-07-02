import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(props, ref) {
  return (
    <input
      ref={ref}
      // className="w-full rounded-3xl py-3 px-4 focus:outline-none"
      className="w-full rounded-3xl py-3 px-4"
      {...props}
    />
  );
});
// function FormInput(props) {
//   console.log(props);
//   return <input className="w-full rounded-3xl py-3 px-4" {...props} />;
// }

export default FormInput;
