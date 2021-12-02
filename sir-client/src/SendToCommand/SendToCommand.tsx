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
      <h3>Command</h3>
      <Dropdown
        options={options}
        placeholder="Select a command"
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
      modalTitle="Send Up To Command"
      modalContent={sendToCommandContent}
    />
  ) : <div />;
};

export default SendToCommand;
