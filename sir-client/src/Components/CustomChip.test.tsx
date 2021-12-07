import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomChip from './CustomChip';

describe('CustomChip', () => {
  const customChipText = 'First Chip Text';
  const customChipCloseFn = jest.fn();

  beforeEach(() => {
    render(<CustomChip text={customChipText} onClose={customChipCloseFn} />);
  });

  it('renders passed string inside chip component', () => {
    expect(screen.getByText(customChipText)).toBeInTheDocument();
  });

  it('calls passed onClose function when X button is clicked in chip component', () => {
    userEvent.click(screen.getByRole('button'));
    expect(customChipCloseFn).toHaveBeenCalled();
  });
});
