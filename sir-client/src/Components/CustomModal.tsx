import React, { ReactElement } from 'react';

export type CustomModalSubmitProps = {
  onSubmit: () => void,
  text: string;
}

type CustomModalProps = {
  onModalClose: () => void;
  onModalSubmit: CustomModalSubmitProps;
  modalTitle: string;
  modalContent: ReactElement;
}

const CustomModal: React.FC<CustomModalProps> = ({
  onModalClose,
  onModalSubmit,
  modalTitle,
  modalContent,
}: CustomModalProps) => (
  <div className="modal-container">
    <div className="modal-dialog">
      <div className="modal-header">
        <h4>
          {modalTitle}
        </h4>
        <button
          onClick={onModalClose}
          type="button"
          data-testid="modal-close-button"
        >
          <i className="gg-close" />
        </button>
      </div>
      <hr />
      <div className="modal-content">
        {modalContent}
      </div>
      <hr />
      <div className="modal-footer">
        <button type="button" onClick={onModalClose}>CANCEL</button>
        <button type="submit">
          {onModalSubmit.text}
        </button>
      </div>
    </div>
  </div>
);

export default CustomModal;
