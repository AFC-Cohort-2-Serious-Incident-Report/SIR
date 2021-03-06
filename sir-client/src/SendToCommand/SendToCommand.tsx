import React, { ReactElement } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import CustomModal, { CustomModalSubmitProps } from '../Components/CustomModal';

type SendToCommandProps = {
  onSubmit: (command: string) => void;
  closeModal: () => void;
}

type DropdownState = {
  isOpen: boolean;
  selected: {
    value: string;
    label: string;
  };
}

const SendToCommand : React.FC<SendToCommandProps> = ({
  onSubmit,
  closeModal,
}: SendToCommandProps): ReactElement => {
  const dropDownRef = React.useRef<Dropdown | null>(null);

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
    <form data-testid="send-to-command-modal-form">
      <label htmlFor="command" title="command">Command</label>
      <Dropdown
        options={options}
        placeholder="Select a command"
        ref={dropDownRef}
      />
      <div className="extra-spacing" />
    </form>
  );

  const sendToCommandSubmit: CustomModalSubmitProps = {
    text: 'Send',
    onSubmit: () => {
      // Check if dropdown is selected
      const currentDropdown = dropDownRef.current as Dropdown;
      const dropdownState = currentDropdown.state as DropdownState;
      if (dropdownState.selected.value !== '') {
        onSubmit(dropdownState.selected.label);
      } else {
      // notify user to select a command
      }
    },
  };

  return (
    <CustomModal
      onModalClose={closeModal}
      onModalSubmit={sendToCommandSubmit}
      modalTitle="Send up to command"
      modalContent={sendToCommandContent}
    />
  );
};

export default SendToCommand;
