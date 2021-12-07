import React, { FC, ReactElement } from 'react';
import ChipCloseImg from '../chip-close-img.png';

type CustomChipProps = {
    text: string;
    onClose: () => void;
}

const CustomChip: FC<CustomChipProps> = ({ text, onClose }: CustomChipProps): ReactElement => (
  <div>
    <div>{text}</div>
    <button
      onClick={onClose}
      type="button"
      data-testid="chip-close-button"
    >
      <img className="chip-close" src={ChipCloseImg} alt="chip-close-button" />
    </button>
  </div>
);

export default CustomChip;
