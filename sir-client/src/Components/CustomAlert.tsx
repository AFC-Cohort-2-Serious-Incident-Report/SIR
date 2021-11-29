import React from 'react';
import '../Styles/Styles.css';

export enum AlertType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

type CustomAlertProps = {
  text: string;
  alertType: AlertType;
  onClick?: () => void;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  text,
  onClick,
  alertType,
  onClose,
}: CustomAlertProps) => {
  const alertClass = `alert alert-${alertType}`;
  return (
    <div className={alertClass} aria-label={`${alertType}-notification`} data-testid="alert-container">
      <div className="group">
        <i className="gg-check-o" />
        <span>{text || 'N/A'}</span>
      </div>
      <div className="group">
        {
          onClick !== undefined ? <button type="button" onClick={onClick}>View Reports</button> : null
        }
        <button
          onClick={onClose}
          type="button"
        >
          <i className="gg-close" />
        </button>
      </div>
    </div>
  );
};

CustomAlert.defaultProps = {
  onClick: undefined,
};

export default CustomAlert;
