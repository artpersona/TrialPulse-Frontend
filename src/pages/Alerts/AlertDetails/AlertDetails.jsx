import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BlackNavbar from "../../../components/Protocols/BlackNavbar/BlackNavbar";
import SectionNavbar from "../../../components/Navbar/SectionNavbar/SectionNavbar";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import colorPalette from "../../../utils/styles/colorPalette";

const tabs = [
	{
		id: "info",
		label: "Info",
		path: "",
	}
];

function AlertDetails() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const editPages = ["edit-alert"];
	const currentPage = pathname.split("/").slice(-1)[0];
	const isEditPage = editPages.includes(currentPage);
	return (
		<div>
			{isEditPage ? (
				<BlackNavbar>
					<div style={{ width: "100%", paddingLeft: 10 }}>
						<ChevronLeftIcon
							height={25}
							width={25}
							color={colorPalette.SECONDARY_COLOR}
							style={{ cursor: "pointer" }}
							onClick={() => navigate(-1)}
						/>
					</div>
				</BlackNavbar>
			) : (
				<BlackNavbar>
					<SectionNavbar tabs={tabs} />
				</BlackNavbar>
			)}
			<Outlet />
		</div>
	);
}

export default AlertDetails;
