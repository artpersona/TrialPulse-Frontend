import "./Study.styles.css";
import { useNavigate } from "react-router-dom";
import {
  ClipboardDocumentIcon,
  UserGroupIcon,
  ArrowLongRightIcon,
  Battery50Icon,
} from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette";

function Study(props) {
  const { title } = props;

  const navigate = useNavigate();

  function handleClick() {
    navigate("details/1");
  }

  return (
    <div className="study" onClick={handleClick}>
      <div className="study__top">
        <div
          className="study__topIcon"
          style={{ backgroundColor: colorPalette.GRAY }}
        >
          <ClipboardDocumentIcon width={16} height={16} color="white" />
        </div>
        <div className="study__topRight">
          <h4 style={{ color: colorPalette.PRIMARY_COLOR }}>{title}</h4>
          <p>Last viewed August 24</p>
        </div>
      </div>

      <div className="study__content">
        <p>Hello world</p>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <div
          className="study__bottomUsers"
          style={{ backgroundColor: colorPalette.GRAY_LIGHT }}
        >
          <UserGroupIcon
            width={15}
            height={15}
            color={colorPalette.PRIMARY_COLOR_LIGHT}
          />
          <p>15</p>
        </div>
        <div
          className="study__bottomUsers"
          style={{ backgroundColor: colorPalette.GRAY_LIGHT }}
        >
          <Battery50Icon
            width={15}
            height={15}
            color={colorPalette.PRIMARY_COLOR_LIGHT}
          />
          <p>In-Progress</p>
        </div>
      </div>

      <div
        className="study__bottom"
        style={{
          color: colorPalette.SECONDARY_COLOR,
        }}
      >
        <p>View Details</p>
        <ArrowLongRightIcon
          width={25}
          height={25}
          color={colorPalette.SECONDARY_COLOR}
        />
      </div>
    </div>
  );
}

export default Study;
