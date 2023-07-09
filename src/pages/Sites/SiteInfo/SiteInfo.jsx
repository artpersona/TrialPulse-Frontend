import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { privateClient } from "../../../api";
import Notes from "../../../components/Protocols/Notes/Notes";
import Site from "../../../components/Protocols/Site/Site";

function SiteInformation() {
	const { siteId } = useParams();

	const [loading, setLoading] = useState(true);
	const [site, setSite] = useState(null);

  const navigate = useNavigate();

	useEffect(() => {
		fetchSponsor();
	}, [siteId]);

	async function fetchSponsor() {
		try {
			const res = await privateClient({
				url: `/sites/${siteId}`,
				method: "get",
			});
			setSite(res.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	if (loading) {
		return <div></div>;
	}

  function handleEditClick() {
    navigate('edit-site');
  }

	return (
		<div className="pb-20">
			<Site title={site?.name} />
			<Notes />
			<div className="sticky bottom-4 left-0 w-full flex items-center justify-center mt-4">
				<button
					onClick={handleEditClick}
					className="button w-64 bg-secondary text-white font-sm py-3 rounded-full hover:bg-secondary-dark"
				>
					Edit Site
				</button>
			</div>
		</div>
	);
}

export default SiteInformation;
