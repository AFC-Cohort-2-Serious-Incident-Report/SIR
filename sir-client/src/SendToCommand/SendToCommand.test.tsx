import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import SirForm from '../SirForm/SirForm';
import SendToCommand from './SendToCommand';

describe('SirForm', () => {
  beforeEach(() => {
    render(<SendToCommand />);
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
});
