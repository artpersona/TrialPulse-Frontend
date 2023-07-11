import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FormRow from "src/components/Form/FormRow";
import FormCol from "src/components/Form/FormCol";
import FormInput from "src/components/Form/FormInput";
import FormSelect from "src/components/Form/FormSelect";
import FormTextArea from "src/components/Form/FormTextArea";

import { privateClient } from "src/api";
import useGetSponsor from "src/api/sponsors/useGetSponsor";
import useGetProtocol from "src/api/protocols/useGetProtocol";

import { useAuthContext } from "src/contexts/AuthContext";

import "./GeneralInfo.styles.css";

function GeneralInfo() {
	const { protocolId } = useParams();

	const { api, protocol } = useGetProtocol(protocolId);
	const { userDetails } = useAuthContext();
	const { sponsorId } = userDetails;

	const { api: apiSponsorAdmin, sponsor: sponsorAdmin } =
		useGetSponsor(sponsorId);
	const [sponsors, setSponsors] = useState([]);

	useEffect(() => {
		fetchSponsors();
	}, []);

	async function fetchSponsors() {
		try {
			const res = await privateClient({
				url: `/sponsors?page=1`,
			});
			setSponsors(res.data.data);
		} catch (error) {
			console.log(error);
		}
	}

	if (api.isLoading) {
		return <div>Loading..</div>;
	}

	if (sponsorId) {
		if (apiSponsorAdmin.isLoading) {
			return <div>Loading..</div>;
		}
	}

	return (
		<div className="generalInfo">
			<h2 style={{ textAlign: "center", marginBottom: 20 }}>General Info</h2>

			<div className="generalInfo__section">
				<FormRow>
					<FormCol label="Study Name">
						<FormInput defaultValue={protocol.title} disabled/>
					</FormCol>
				</FormRow>
				<FormRow>
					<FormCol label="Sponsor">
						{userDetails.roleId === 3 || userDetails.roleId === 4 ? (
							<FormSelect options={sponsors} disabled value={sponsorAdmin.id} />
						) : (
							<FormSelect
								options={sponsors}
								disabled
								value={protocol.sponsorId}
							/>
						)}
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
					<FormCol label="Eligibility Overview">
						<FormTextArea value={protocol.eligibilityOverview} disabled/>
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
			/> */}

			{/* <div className="generalInfo__section">
				<p>Active on App</p>
				<select>
					<option value="Active">Active</option>
					<option value="Inactive">Inactive</option>
				</select>
			</div> */}
		</div>
	);
}

export default GeneralInfo;
