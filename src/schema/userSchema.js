// import { zfd } from "zod-form-data";
import { z as zfd } from "zod";

export default zfd.object({
	username: zfd.string(),
	firstName: zfd.string(),
	lastName: zfd.string(),
	position: zfd.string(),
	email: zfd.string().refine((value) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(value);
	}, "Invalid email address"),
	contactNumber: zfd.string().refine((value) => {
		const phoneNumberRegex = /^\d{5,}$/;
		return phoneNumberRegex.test(value);
	}, "Invalid phone number"),
	address1: zfd.string(),
	address2: zfd.string(),
	zipcode: zfd.string(),
	// cityId: zfd.string(),
	// stateId: zfd.string(),
});
