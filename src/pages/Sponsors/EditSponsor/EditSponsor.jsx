import { useRef } from "react";

import useZodForm from "src/hooks/useZodForm";

import FormRow from "src/components/Form/FormRow";
import FormCol from "src/components/Form/FormCol";
import FormInput from "src/components/Form/FormInput";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";

import sponsorSchema from "src/schema/sponsorSchema";
import { useNavigate, useParams } from "react-router-dom";
import useGetSponsor from "../../../api/sponsors/useGetSponsor";
import useUpdateSponsor from "../../../api/sponsors/useUpdateSponsor";

function EditSponsor() {
	const { sponsorId } = useParams();

	const navigate = useNavigate();
	const { api, sponsor } = useGetSponsor(sponsorId);

	const formRef = useRef(null);

	const { mutate } = useUpdateSponsor({
		resetForm: () => null,
		sponsorId,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useZodForm(sponsorSchema);

	const handleUpdateSponsor = (data) => {
		mutate(data);

		navigate(-1);
	};

	const defaultValues = {
		name: sponsor?.name,
		contactPersonName: sponsor?.contactPersonName,
		contactPersonEmail: sponsor?.contactPersonEmail,
		contactPersonNumber1: sponsor?.contactPersonNumber1,
		contactPersonNumber2: sponsor?.contactPersonNumber2,
		address: sponsor?.address,
		notes: sponsor?.notes,
		cmo: sponsor?.cmo,
	};

	if (api.isLoading) {
		return <div>Loading..</div>;
	}

	return (
		<div className="pb-10 relative">
			{/* <BlackNavbar /> */}

			<form ref={formRef} onSubmit={handleSubmit(handleUpdateSponsor)}>
				<div className="card w-[400px] p-4">
					<h2 className="font-medium mt-2">Sponsor Details</h2>
					<FormRow>
						<FormCol label="Sponsor Name" error={errors.name}>
							<FormInput
								{...register("name")}
								defaultValue={defaultValues.name}
							/>
						</FormCol>
					</FormRow>
					<FormRow>
						<FormCol label="CRO" error={errors.cmo}>
							<FormInput
								{...register("cmo")}
								defaultValue={defaultValues.cmo}
							/>
						</FormCol>
					</FormRow>
					<FormRow>
						<FormCol label="Notes" error={errors.notes}>
							<FormInput
								{...register("notes")}
								defaultValue={defaultValues.notes}
							/>
						</FormCol>
					</FormRow>

					<h2 className="font-medium mt-4">Contact Person Details</h2>
					<FormRow>
						<FormCol label="Name" error={errors.contactPersonName}>
							<FormInput
								{...register("contactPersonName")}
								defaultValue={defaultValues.contactPersonName}
							/>
						</FormCol>
					</FormRow>
					<FormRow>
						<FormCol label="Email" error={errors.contactPersonEmail}>
							<FormInput
								{...register("contactPersonEmail")}
								defaultValue={defaultValues.contactPersonEmail}
							/>
						</FormCol>
					</FormRow>
					<FormRow>
						<FormCol label="Contact Number" error={errors.contactPersonNumber1}>
							<FormInput
								{...register("contactPersonNumber1")}
								defaultValue={defaultValues.contactPersonNumber1}
							/>
						</FormCol>
					</FormRow>
					<FormRow>
						<FormCol
							label="Secondary Contact Number"
							error={errors.contactPersonNumber2}
						>
							<FormInput
								{...register("contactPersonNumber2")}
								defaultValue={defaultValues.contactPersonNumber2}
							/>
						</FormCol>
					</FormRow>
					<FormRow>
						<FormCol label="Address" error={errors.address}>
							<FormInput
								{...register("address")}
								defaultValue={defaultValues.address}
							/>
						</FormCol>
					</FormRow>
				</div>

				<div className="absolute -left-80 top-5 w-full flex items-center gap-4">
					<button
						type="submit"
						className="button w-64 bg-secondary text-white font-sm py-3 rounded-full hover:bg-secondary-dark"
					>
						Update Sponsor
					</button>
				</div>
			</form>
		</div>
	);
}

export default EditSponsor;
