import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomChips from './CustomChips';

describe('CustomChip', () => {
  const firstChipText = 'First Chip Text';
  const secondChipText = 'Second Chip Text';
  const thirdChipText = 'Third Chip Text';
  const chipFn = jest.fn();
  const chips = [
    { text: firstChipText, onClose: chipFn },
    { text: secondChipText, onClose: chipFn },
    { text: thirdChipText, onClose: chipFn },
  ];

  beforeEach(() => {
    render(<CustomChips chips={chips} />);
  });

  it('calls passed onClose function when X button is clicked in chip component', () => {
    userEvent.click(screen.getByTestId(`id-${firstChipText}`));
    expect(chipFn).toHaveBeenCalled();
  });

  it('renders a CustomChip for each chip passed with passed text for each', () => {
    expect(screen.getByText(firstChipText)).toBeInTheDocument();
    expect(screen.getByText(secondChipText)).toBeInTheDocument();
    expect(screen.getByText(thirdChipText)).toBeInTheDocument();
  });
});
