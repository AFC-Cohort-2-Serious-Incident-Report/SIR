import React, { FC, ReactElement } from 'react';
import ChipCloseImg from '../chip-close-img.png';

type CustomChipProps = {
    text: string;
    onClose: () => void;
}

const CustomChip: FC<CustomChipProps> = ({ text, onClose }: CustomChipProps): ReactElement => (
  <div className="chip-container">
    <div className="chip-text">{text}</div>
    <button
      className="chip-button"
      onClick={onClose}
      type="button"
      data-testid={`id-${text}`}
    >
      <img className="chip-close" src={ChipCloseImg} alt="chip-close-button" />
    </button>
  </div>
);

type CustomChipsProps = {
    chips: CustomChipProps[];
}

const CustomChips: FC<CustomChipsProps> = ({ chips }: CustomChipsProps): ReactElement => (
  <div className="bag-o-chips">
    {chips.map((c: CustomChipProps, i: number) => (
      <CustomChip
        key={i.toString()}
        text={c.text}
        onClose={c.onClose}
      />
    ))}
  </div>
);

export default CustomChips;
