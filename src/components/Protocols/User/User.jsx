import { BsFillCircleFill } from "react-icons/bs";
import { LuEdit } from "react-icons/lu";
import {
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChatBubbleOvalLeftIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

import colorPalette from "src/utils/styles/colorPalette";

import "./User.styles.css";
import AvatarContainer from "../../AvatarContainer/AvatarContainer";

function User(props) {
  const {
    user: { profile },
  } = props;

  return (
    <>
      {/* user avatar */}
      <section>
        <figure
          className="user__topIcon"
          style={{ backgroundColor: colorPalette.GRAY }}
        >
          <figure className="text-green relative">
            {/* {data.onlineStatus && ( */}
            <span className="absolute -mt-2 -ml-2">
              <BsFillCircleFill className="text-xs" />
            </span>
            {/* )} */}
            <AvatarContainer Icon={BuildingOfficeIcon} />
          </figure>
        </figure>

        {/* online status */}
        <div className="flex flex-col justify-center items-center my-2">
          <p className={`text-xs text-green font-medium mb-3`}>
            Currently Online
          </p>

          <h4 className="text-primary font-medium capitalize">
            {profile?.firstName} {profile?.lastName}
          </h4>
          <p className="text-sm capitalize text-gray">{profile?.position}</p>
        </div>

        {/* action buttons */}
        <div className="flex gap-4 justify-center items-center mt-6 mb-6">
          {/* <AvatarContainer
            Icon={PhoneIcon}
            color={colorPalette.SECONDARY_COLOR}
          /> */}
          <AvatarContainer
            Icon={ChatBubbleOvalLeftIcon}
            color={colorPalette.SECONDARY_COLOR}
          />
          <AvatarContainer
            Icon={StarIcon}
            color={colorPalette.SECONDARY_COLOR}
          />
        </div>
      </section>

      {/* card sections */}
      <main>
        <section className="user">
          <div className="user__section">
            <div className="user__sectionLeft">
              <PhoneIcon height={25} width={25} color={colorPalette.GRAY} />
            </div>
            <p
              style={{ color: colorPalette.SECONDARY_COLOR, fontWeight: "500" }}
            >
              393-343-2334
            </p>
          </div>
          {/* divider */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: "gray",
              margin: "20px 0",
            }}
          />
          <div className="user__section">
            <div className="user__sectionLeft">
              <EnvelopeIcon height={25} width={25} color={colorPalette.GRAY} />
            </div>
            <p
              style={{ color: colorPalette.SECONDARY_COLOR, fontWeight: "500" }}
            >
              {profile?.email}
            </p>
          </div>
          {/* divider */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: "gray",
              margin: "20px 0",
            }}
          />
          <div className="user__section">
            <div className="site__sectionLeft">
              <MapPinIcon height={25} width={25} color={colorPalette.GRAY} />
            </div>
            <div>
              <p className={`text-sm`} style={{ color: colorPalette.GRAY }}>
                2929 W Medical Court Circle
              </p>
              <p className={`text-sm`} style={{ color: colorPalette.GRAY }}>
                Suite 42
              </p>
              <p className={`text-sm`} style={{ color: colorPalette.GRAY }}>
                Court Circle
              </p>
            </div>
          </div>
        </section>

        <section className="user mt-[50px]">
          <article className="notes__top user__section flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <figure
                className="notes__topIcon"
                style={{ backgroundColor: colorPalette.GRAY }}
              >
                <BuildingOfficeIcon width={25} height={25} color="white" />
              </figure>
              <h4 style={{ color: colorPalette.PRIMARY_COLOR, fontSize: 20 }}>
                Protocols
              </h4>
            </div>

            <LuEdit
              style={{
                color: colorPalette.SECONDARY_COLOR,
                fontSize: 20,
                fontWeight: "500",
              }}
            />
          </article>

          <div className="user__section">
            <ul className="list-disc list-disc-lg pl-6">
              <li className="text-sm text-gray-500">
                2929 W Medical Court Circle
              </li>
              <li className="text-sm text-gray-500">Suite 42</li>
              <li className="text-sm text-gray-500">Court Circle</li>
            </ul>
          </div>
        </section>

        <section className="user mt-[50px]">
          <article className="notes__top user__section flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <figure
                className="notes__topIcon"
                style={{ backgroundColor: colorPalette.GRAY }}
              >
                <BuildingOfficeIcon width={25} height={25} color="white" />
              </figure>
              <h4 style={{ color: colorPalette.PRIMARY_COLOR, fontSize: 20 }}>
                Sites
              </h4>
            </div>

            <LuEdit
              style={{
                color: colorPalette.SECONDARY_COLOR,
                fontSize: 20,
                fontWeight: "500",
              }}
            />
          </article>

          <div className="user__section">
            <ul className="list-disc list-disc-lg pl-6">
              <li className="text-sm text-gray-500">
                2929 W Medical Court Circle
              </li>
              <li className="text-sm text-gray-500">Suite 42</li>
              <li className="text-sm text-gray-500">Court Circle</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export default User;

import PropTypes from "prop-types";

User.propTypes = {
  user: PropTypes.object,
};
