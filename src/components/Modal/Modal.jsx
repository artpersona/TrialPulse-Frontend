import PropTypes from "prop-types";
import "./Modal.styles.css";
import { createPortal } from "react-dom";

function Modal(props) {
  const { children } = props;

  return (
    <>{createPortal(<div className="modal overflow-y-auto">{children}</div>, document.body)}</>
  );
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.element,
};
