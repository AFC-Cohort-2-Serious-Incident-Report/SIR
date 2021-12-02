import React, { ReactElement, useState } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import CustomModal, { CustomModalSubmitProps } from '../Components/CustomModal';

type SendToCommandProps = {
  onSubmit: () => void;
  showModal: boolean;
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
  showModal,
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
    <form>
      <label htmlFor="command">Command</label>
      <Dropdown
        options={options}
        placeholder="Select a command"
        ref={dropDownRef}
      />
    </form>
  );

  const sendToCommandSubmit: CustomModalSubmitProps = {
    text: 'Send',
    onSubmit: () => {
      // Check if dropdown is selected
      const currentDropdown = dropDownRef.current as Dropdown;
      const dropdownState = currentDropdown.state as DropdownState;
      console.log(currentDropdown.state);
      console.log(dropdownState);
      if (dropdownState.selected.value !== '') {
        console.log(`Sending to command: ${dropdownState.selected.value}`);
        onSubmit();
      } else {
      // notify user to select a command
        console.log("User didn't select a command");
      }
    },
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
