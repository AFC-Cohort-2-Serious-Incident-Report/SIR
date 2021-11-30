import React from 'react';
import '../Styles/Styles.css';

export enum AlertType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export type CustomAlertLink = {
  text: string;
  onClick: () => void;
};

type CustomAlertProps = {
  text: string;
  alertType: AlertType;
  customAlertLink?: CustomAlertLink;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  text,
  customAlertLink,
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
          customAlertLink !== undefined
          && <button type="button" onClick={customAlertLink.onClick}>{customAlertLink.text}</button>
        }
        <button
          onClick={onClose}
          type="button"
          title="Close Alert"
        >
          <i className="gg-close" />
        </button>
      </div>
    </div>
  );
};

CustomAlert.defaultProps = {
  customAlertLink: undefined,
};

export default CustomAlert;
