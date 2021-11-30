import { render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import assert from 'assert';
import SirForm from '../SirForm/SirForm';
import SendToCommand from './SendToCommand';

describe('Send To Command Modal', () => {
  const handleSubmit = jest.fn();
  beforeEach(() => {
    render(<SendToCommand onSubmit={handleSubmit} />);
  });

  it('renders components correctly', () => {
    expect(screen.getByTestId('commandModalTitle')).toBeInTheDocument();
    expect(screen.queryByText(/send up to command/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/command/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /command/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeEnabled();
  });

  it('accepts command selection', () => {
    userEvent.selectOptions(screen.getByRole('combobox', { name: /command/i }), 'Battalion Commander');
    expect(screen.getByRole('combobox', { name: /command/i })).toHaveValue('Battalion Commander');
  });

  it('handles submission button correctly', () => {
    userEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
