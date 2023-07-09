import { useNavigate } from "react-router-dom";
import GeneralInfoComponent from "src/components/Protocols/GeneralInfo";
import StudyDetails from "src/components/Protocols/StudyDetails";

function GeneralInfo() {
	const navigate = useNavigate();
	function handleEditClick() {
		navigate("edit-general-info");
	}
	return (
		<div className="pb-10">
			<GeneralInfoComponent />
			<StudyDetails />
			<div className="sticky bottom-4 left-0 w-full flex items-center justify-center mt-4">
				<button
					onClick={handleEditClick}
					className="button w-64 bg-secondary text-white font-sm py-3 rounded-full hover:bg-secondary-dark"
				>
					Edit General Information
				</button>
			</div>
		</div>
	);
}

export default GeneralInfo;
