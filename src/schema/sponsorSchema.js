// import { zfd } from "zod-form-data";
import { z as zfd } from "zod";

export default zfd.object({
  name: zfd.string(),
  cmo: zfd.string(),
  notes: zfd.string(),
  contactPersonName: zfd.string(),
  contactPersonEmail: zfd.string().refine((value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }, "Invalid email address"),
  contactPersonNumber1: zfd.string().refine((value) => {
    const phoneNumberRegex = /^\d{5,}$/;
    return phoneNumberRegex.test(value);
  }, "Invalid phone number"),
  contactPersonNumber2: zfd.string().refine((value) => {
    const phoneNumberRegex = /^\d{5,}$/;
    return phoneNumberRegex.test(value);
  }, "Invalid phone number"),
  address: zfd.string(),
});
