import React from 'react';
import '../Styles/Styles.css';

interface CustomAlertProps {
  text: string;
  onClick?: () => void;
  close: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  text,
  onClick,
  close,
}: CustomAlertProps) => (
  <div className="alert">
    <div className="group">
      <i className="gg-check-o" />
      <span>{text || 'N/A'}</span>
    </div>
    <div className="group">
      {
          onClick !== undefined ? <button type="button" onClick={onClick}>View Reports</button> : null
        }
      <button
        onClick={close}
        type="button"
      >
        <i className="gg-close" />
      </button>
    </div>
  </div>
);

CustomAlert.defaultProps = {
  onClick: undefined,
};

export default CustomAlert;
/*
if $text is not specified, text should default to 'N/A'

if $onClick is NOT specified, nothing should happen.
if $onClick IS specified, a button with text should appear on the right (View Report)
    button on the right should fire the onClick function when clicked.
.
possibly: setTimeout for alert creation, which automatically removes the alert after defined timeout
 */
