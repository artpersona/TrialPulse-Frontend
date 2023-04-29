import "./Site.styles.css";
import {
  UserGroupIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette";

function Site(props) {
  const { title } = props;

  return (
    <div className="site">
      <div
        className="site__topIcon"
        style={{ backgroundColor: colorPalette.GRAY }}
      >
        <BuildingOfficeIcon width={40} height={40} color="white" />
      </div>

      <h4
        style={{
          color: colorPalette.PRIMARY_COLOR,
          textAlign: "center",
          margin: "20px 0",
          fontSize: "20px",
        }}
      >
        {title}
      </h4>

      <div className="site__section">
        <div className="site__sectionLeft">
          <PhoneIcon height={25} width={25} color={colorPalette.GRAY} />
        </div>
        <p style={{ color: colorPalette.SECONDARY_COLOR, fontWeight: "500" }}>
          393-343-2334
        </p>
      </div>
      <div className="site__section">
        <div className="site__sectionLeft">
          <EnvelopeIcon height={25} width={25} color={colorPalette.GRAY} />
        </div>
        <p style={{ color: colorPalette.SECONDARY_COLOR, fontWeight: "500" }}>
          393-343-2334
        </p>
      </div>
      <div className="site__section">
        <div className="site__sectionLeft">
          <MapPinIcon height={25} width={25} color={colorPalette.GRAY} />
        </div>
        <div>
          <p>2929 W Medical Court Circle</p>
          <p>Suite 42</p>
          <p>Court Circle</p>
        </div>
      </div>

      <div className="site__section">
        <div className="site__sectionLeft">
          <div />
        </div>
        <div
          className="site__bottomUsers"
          style={{ backgroundColor: colorPalette.GRAY_LIGHT }}
        >
          <UserGroupIcon
            width={25}
            height={25}
            color={colorPalette.PRIMARY_COLOR_LIGHT}
          />
          <p>25</p>
        </div>
      </div>
    </div>
  );
}

export default Site;
