import { useRef } from "react";

import useZodForm from "src/hooks/useZodForm";

import useGetSponsors from "src/api/sponsors/useGetSponsors";
import useUpdateProtocolGeneralInfo from "src/api/protocols/useUpdateProtocolGeneralInfo";

import FormRow from "src/components/Form/FormRow";
import FormCol from "src/components/Form/FormCol";
import FormInput from "src/components/Form/FormInput";
import FormSelect from "src/components/Form/FormSelect";
import FormTextArea from "src/components/Form/FormTextArea";

import protocolSchema from "src/schema/protocolSchema";

import { drugRoutes } from "src/shared/constants";
import { useNavigate, useParams } from "react-router-dom";
import useGetProtocol from "../../../../api/protocols/useGetProtocol";

const activeOnApp = [
	{
		id: "Active",
		name: "Active",
	},
	{
		id: "Inactive",
		name: "Inactive",
	},
];

const phases = [
	{
		id: "Phase 1",
		name: "Phase 1",
	},
	{
		id: "Phase 2",
		name: "Phase 2",
	},
	{
		id: "Phase 3",
		name: "Phase 3",
	},
	{
		id: "Phase 4",
		name: "Phase 4",
	},
];

const timeframes = [
	{
		id: "Days",
		name: "Days",
	},
	{
		id: "Weeks",
		name: "Weeks",
	},
];

const booleans = [
	{
		id: "Yes",
		name: "Yes",
	},
	{
		id: "No",
		name: "No",
	},
];

const populations = [
	{
		id: "18",
		name: "Mov-Sev CD",
	},
];

const bionaives = [
	{
		id: "50",
		name: "50",
	},
	{
		id: "100",
		name: "100",
	},
];

function EditGeneralInfo() {
	const navigate = useNavigate();
	const { sponsors, api } = useGetSponsors({ sort: "" });
	const { protocolId } = useParams();
	const { api: protocolAPI, protocol } = useGetProtocol(protocolId);
	const { mutate } = useUpdateProtocolGeneralInfo({
		resetForm: () => null,
		protocolId,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useZodForm(protocolSchema);

	const formRef = useRef(null);
	const submitData = (data) => {
		mutate({
			...data,
			sponsorId: parseInt(data.sponsorId),
			lte: parseInt(data.lte),
			population: parseInt(data.population),
			bioIr: parseInt(data.bioIr),
			drugTreatmentPeriod: `${data.drugTreatmentPeriod} ${data.drugTreatmentPeriodType}`,
		});
		navigate(-1);
	};

	// console.log(errors);
	if (api.isLoading || protocolAPI.isLoading) {
		return <div>Loading</div>;
	}

	return (
		<div className="pb-10">
			<form ref={formRef} onSubmit={handleSubmit(submitData)}>
				{/* GENERAL INFO */}
				<div className="generalInfo">
					<h2 style={{ textAlign: "center", marginBottom: 20 }}>
						General Info
					</h2>

					<div className="generalInfo__section">
						<FormRow>
							<FormCol label="Study Name" error={errors.title}>
								<FormInput
									{...register("title")}
									defaultValue={protocol.title}
								/>
							</FormCol>
						</FormRow>
						<FormRow>
							<FormCol label="Sponsor" error={errors.sponsorId}>
								<FormSelect
									options={sponsors}
									{...register("sponsorId")}
									defaultValue={protocol.sponsorId}
									disabled
								/>
							</FormCol>
						</FormRow>
					</div>

					<div
						style={{
							width: "100%",
							height: 1,
							background: "gray",
							margin: "20px 0",
						}}
					/>

					<div className="generalInfo__section">
						<FormRow>
							<FormCol
								label="Eligibility Overview"
								error={errors.eligibilityOverview}
							>
								<FormTextArea
									{...register("eligibilityOverview")}
									defaultValue={protocol.eligibilityOverview}
								/>
							</FormCol>
						</FormRow>
					</div>

					{/* <div
						style={{
							width: "100%",
							height: 1,
							background: "gray",
							margin: "20px 0",
						}}
					/>

					<div className="generalInfo__section">
						<FormRow>
							<FormCol label="Active on App">
								<FormSelect
									options={activeOnApp}
									defaultValue={protocol.eligibilityOverview}
								/>
							</FormCol>
						</FormRow>
					</div> */}
				</div>

				{/* STUDY DETAILS */}
				<div className="studyDetails">
					<h2 style={{ textAlign: "center", marginBottom: 20 }}>
						Study Details
					</h2>

					<FormRow>
						<FormCol label="Study Number" error={errors.studyNumber}>
							<FormInput
								{...register("studyNumber")}
								defaultValue={protocol.studyNumber}
							/>
						</FormCol>
					</FormRow>

					<FormRow>
						<FormCol label="Study Details Info" error={errors.studyInfo}>
							<FormTextArea
								{...register("studyInfo")}
								defaultValue={protocol.studyInfo}
							/>
						</FormCol>
					</FormRow>

					<FormRow>
						<FormCol label="Phase" error={errors.phase}>
							<FormSelect
								options={phases}
								{...register("phase")}
								defaultValue={protocol.phase}
							/>
						</FormCol>
					</FormRow>

					<FormRow>
						<FormCol label="Drug Route" error={errors.drugRoute}>
							<FormSelect
								options={drugRoutes.map((item) => ({ id: item, name: item }))}
								{...register("drugRoute")}
								defaultValue={protocol.drugRoute}
							/>
						</FormCol>
					</FormRow>

					<FormRow>
						<FormCol label="Drug Target" error={errors.drugTarget}>
							<FormSelect
								options={activeOnApp}
								{...register("drugTarget")}
								defaultValue={protocol.drugTarget}
							/>
						</FormCol>
					</FormRow>

					<FormRow>
						<FormCol
							label="Drug Treatment Period"
							error={errors.drugTreatmentPeriod}
						>
							<FormInput
								{...register("drugTreatmentPeriod")}
								defaultValue={protocol.drugTreatmentPeriod.split(" ")[0]}
							/>
						</FormCol>

						<FormCol label="." error={errors.drugTreatmentPeriodType}>
							<FormSelect
								options={timeframes}
								{...register("drugTreatmentPeriodType")}
								defaultValue={protocol.drugTreatmentPeriod.split(" ")[1]}
							/>
						</FormCol>
					</FormRow>

					<FormRow>
						<FormCol label="Placebo" error={errors.placebo}>
							<FormSelect
								options={booleans}
								{...register("placebo")}
								defaultValue={protocol.placebo}
							/>
						</FormCol>
					</FormRow>

					<FormRow>
						<FormCol label="LTE" error={errors.lte}>
							<FormInput {...register("lte")} defaultValue={protocol.lte} />
						</FormCol>

						<FormCol label="." error={errors.lteDurationType}>
							<FormSelect
								options={timeframes}
								{...register("lteDurationType")}
								defaultValue={protocol.lteDurationType}
							/>
						</FormCol>
					</FormRow>

					<FormRow>
						<FormCol label="Population" error={errors.population}>
							<FormSelect
								options={populations}
								{...register("population")}
								defaultValue={protocol.population}
							/>
						</FormCol>
					</FormRow>
					<FormRow>
						<FormCol label="Bio-naive" error={errors.bioNaive}>
							<FormSelect
								options={booleans}
								{...register("bioNaive")}
								defaultValue={protocol.bioNaive}
							/>
						</FormCol>
					</FormRow>

					<FormRow>
						<FormCol label="Bio-IR (min%)" error={errors.bioIr}>
							<FormSelect
								options={bionaives}
								{...register("bioIr")}
								defaultValue={protocol.bioIr}
							/>
						</FormCol>
					</FormRow>
				</div>

				<div className="sticky bottom-4 left-0 w-full flex items-center justify-center mt-4">
					<button
						type="submit"
						className="button w-64 bg-secondary text-white font-sm py-3 rounded-full hover:bg-secondary-dark"
					>
						Update General Information
					</button>
				</div>
			</form>
		</div>
	);
}

export default EditGeneralInfo;
