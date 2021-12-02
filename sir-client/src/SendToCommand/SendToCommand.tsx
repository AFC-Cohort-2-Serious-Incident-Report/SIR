import React, { ReactElement, useState } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import CustomModal, { CustomModalSubmitProps } from '../Components/CustomModal';

type SendToCommandProps = {
  onSubmit: () => void;
}

const SendToCommand : React.FC<SendToCommandProps> = ({
  onSubmit,
}: SendToCommandProps): ReactElement => {
  const [showModal, setShowModal] = useState(true);
  const options: Option[] = [
    {
      label: 'Company Commander',
      value: 'company-commander',
    },
    {
      label: 'Battalion Commander',
      value: 'battalion-commander',
    },
    {
      label: 'Brigade Commander',
      value: 'brigade-commander',
    },
  ];
  const sendToCommandContent: ReactElement = (
    <form>
      <label htmlFor="command">Command</label>
      <Dropdown
        options={options}
        placeholder="Select a command"
        test-id="send-to-command-modal"
      />
    </form>
  );
  const sendToCommandSubmit: CustomModalSubmitProps = {
    text: 'Send',
    onSubmit,
  };
  const closeModal: () => void = () => {
    setShowModal(false);
  };
  return showModal ? (
    <CustomModal
      onModalClose={closeModal}
      onModalSubmit={sendToCommandSubmit}
      modalTitle="Select a Command for submission."
      modalContent={sendToCommandContent}
    />
  ) : <div />;
};

export default SendToCommand;
