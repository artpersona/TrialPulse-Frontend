function ContentSidebar(props) {
  const { children } = props;

  return (
    <div className="flex flex-col items-center justify-center pt-[100px] pl-[400px]">
      {children}
    </div>
  );
}

export default ContentSidebar;

import PropTypes from "prop-types";

ContentSidebar.propTypes = {
  children: PropTypes.element,
};
