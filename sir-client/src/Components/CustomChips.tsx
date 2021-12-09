import React, { FC, ReactElement, useEffect } from 'react';
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
    chips: string[];
    fieldName: string;
    updateChips: (chips: string[]) => void;
}

const CustomChips: FC<CustomChipsProps> = ({
  chips,
  fieldName,
  updateChips,
}: CustomChipsProps): ReactElement => {
  const [newChip, setNewChip] = React.useState<string>('');

  useEffect(() => {
    if (chips && chips.length > 0) {
      updateChips(chips);
    }

    return () => updateChips([]);
  }, []);

  const addChip = (): void => {
    if (newChip.length > 0) {
      updateChips([...chips, newChip]);
      setNewChip('');
    }
  };

  return (
    <div className="box-o-chips">
      <div className="chips-factory">
        <input
          type="text"
          onChange={(e) => setNewChip(e.target.value)}
          data-testid={`chip-input-${fieldName}`}
          value={newChip}
        />
        <button
          onClick={(e) => addChip()}
          type="button"
          data-testid={`add-chip-button-${fieldName}`}
          className="chip-add-button"
        >
          <i className="gg-math-plus" />
        </button>
      </div>
      {chips && chips.length > 0
        && (
        <div className="bag-o-chips">
          {chips && chips.length > 0 && chips.map((c: string, i: number) => (
            <CustomChip
              key={i.toString()}
              text={c}
              onClose={() => updateChips(chips.filter((chip: string) => chip !== c))}
            />
          ))}
        </div>
        )}
    </div>
  );
};

export default CustomChips;
