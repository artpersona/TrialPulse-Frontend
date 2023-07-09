import { useRef } from "react";

import useZodForm from "src/hooks/useZodForm";

import useUpdateSite from "src/api/sites/useUpdateSite";

import FormCol from "src/components/Form/FormCol";
import FormInput from "src/components/Form/FormInput";

import siteSchema from "src/schema/siteSchema";
import { useNavigate, useParams } from "react-router-dom";
import useGetSite from "../../../api/sites/useGetSite";

function EditSite() {
	const formRef = useRef(null);
	const { siteId } = useParams();
	const { api, site } = useGetSite(siteId);
  const navigate = useNavigate();

	const { mutate } = useUpdateSite({
		resetForm: () => null,
		siteId,
	});
	async function handleUpdateSponsor(data) {
		mutate(data);
		navigate(-1);
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useZodForm(siteSchema);

	if (api.isLoading) {
		return <div>Loading..</div>;
	}

	return (
		<div className="pb-10">
			<form ref={formRef} onSubmit={handleSubmit(handleUpdateSponsor)}>
				<div className="card w-[400px] p-4">
					<div className="form-row">
						<FormCol label="Site Name" error={errors.name}>
							<FormInput {...register("name")} defaultValue={site.name}/>
						</FormCol>
					</div>
					<div className="form-row">
						<FormCol label="Email" error={errors.contactEmail}>
							<FormInput {...register("contactEmail")} defaultValue={site.contactEmail}/>
						</FormCol>
					</div>
				</div>
				<div className="form-actions">
					<button type="submit" className="modal-proceed mt-4">
						Update Site
					</button>
				</div>
			</form>
		</div>
	);
}

export default EditSite;
