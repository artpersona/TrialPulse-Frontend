import "./AvatarContainer.styles.css";

function AvatarContainer(props) {
  const { Icon, color, onClick = null } = props;

  return (
    <div
      className="avatarContainer cursor-pointer hover:border-primary"
      onClick={onClick}
    >
      <Icon
        height={20}
        width={20}
        color={props.color ? `${props.color}` : "#ffffff"}
      />
    </div>
  );
}

export default AvatarContainer;

import PropTypes from "prop-types";

AvatarContainer.propTypes = {
  Icon: PropTypes.object,
  color: PropTypes.string,
};
