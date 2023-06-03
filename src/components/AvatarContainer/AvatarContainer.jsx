import "./AvatarContainer.styles.css";

function AvatarContainer(props) {
  const { Icon, color } = props;

  return (
    <div className="avatarContainer">
      <Icon height={20} width={20} color={props.color ?`${props.color}`: "#ffffff"} />
    </div>
  );
}

export default AvatarContainer;

import PropTypes from "prop-types";

AvatarContainer.propTypes = {
  Icon: PropTypes.object,
  color: PropTypes.string,
};
