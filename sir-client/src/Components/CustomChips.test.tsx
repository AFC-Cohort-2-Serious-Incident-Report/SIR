import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomChips from './CustomChips';

describe('CustomChip', () => {
  const firstChipText = 'First Chip Text';
  const secondChipText = 'Second Chip Text';
  const thirdChipText = 'Third Chip Text';
  const updateChipFn = jest.fn();
  const chips = [firstChipText, secondChipText, thirdChipText];

  beforeEach(() => {
    render(<CustomChips chips={chips} fieldName="type-of-event" updateChips={updateChipFn} />);
  });

  it('calls passed updateChips function when X button is clicked in chip component', () => {
    userEvent.click(screen.getByTestId(`id-${firstChipText}`));
    expect(updateChipFn).toHaveBeenCalled();
  });

  it('renders a CustomChip for each chip passed with passed text for each', () => {
    expect(screen.getByText(firstChipText)).toBeInTheDocument();
    expect(screen.getByText(secondChipText)).toBeInTheDocument();
    expect(screen.getByText(thirdChipText)).toBeInTheDocument();
  });

  it('calls updateChips function when a chip is added', () => {
    const newChipText = 'New Chip Text';
    userEvent.type(screen.getByTestId('chip-input-type-of-event'), newChipText);
    userEvent.click(screen.getByTestId('add-chip-button-type-of-event'));
    expect(updateChipFn).toHaveBeenCalled();
  });
});
