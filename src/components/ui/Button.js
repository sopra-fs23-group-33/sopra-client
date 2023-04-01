import "styles/ui/Button.scss";
import PropTypes from "prop-types";

const Button = props => (
  <button {...props} style={{width: props.width, ...props.style}}
    className={`primary-button ${props.className ?? ''}`}>
    {props.children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;
