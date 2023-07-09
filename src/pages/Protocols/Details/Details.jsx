import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

import details1 from "src/assets/images/details/details1.jpg";
import details2 from "src/assets/images/details/details2.jpg";
import details3 from "src/assets/images/details/details3.jpg";
import details4 from "src/assets/images/details/details4.jpg";
import details5 from "src/assets/images/details/details5.jpg";

import useGetProtocol from "src/api/protocols/useGetProtocol";

import DetailsCard from "src/components/Protocols/DetailsCard/DetailsCard";

import colorPalette from "src/utils/styles/colorPalette";

import "./Details.styles.css";

const detailsList = [
  {
    id: "1",
    title: "Study Overview",
    image: details1,
    path: "",
  },
  {
    id: "2",
    title: "Study Information",
    image: details2,
    path: "study-information",
  },
  {
    id: "3",
    title: "Eligibility Criteria",
    image: details3,
    path: "eligibility-criteria",
  },
  {
    id: "4",
    title: "Sites link to Study",
    image: details4,
    path: "sites-link",
  },
  {
    id: "5",
    title: "Documents",
    image: details5,
    path: "documents",
  },
];

function Details() {
  const { protocolId } = useParams();

  const navigate = useNavigate();

  const { protocol } = useGetProtocol(protocolId);

  function handleGoback() {
    navigate("/protocols");
  }

  function handleClick(path) {
    navigate(`${path}`);
  }

  return (
    <div className="relative">
      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 p-5 pt-[150px] w-[400px] shadow-md shadow-gray h-screen overflow-y-scroll bg-gray-background">
        {/* TOP BAR */}
        <div
          className="details__topBar"
          style={{ backgroundColor: colorPalette.GRAY_DARK }}
        >
          <div className="flex items-center gap-2">
            <ChevronLeftIcon
              width={25}
              height={25}
              color={colorPalette.SECONDARY_COLOR}
              style={{ cursor: "pointer" }}
              onClick={handleGoback}
            />
            <p className="text-secondary text-sm">
              Protocols / {protocol?.title}
            </p>
          </div>
          <div className="details__topBarRight"></div>
        </div>
        {detailsList.map((item) => (
          <DetailsCard
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            onClick={() => handleClick(item.path)}
            path={item.path}
          />
        ))}
      </div>
      <div className="details__content">
        <Outlet />
      </div>
    </div>
  );
}

export default Details;
