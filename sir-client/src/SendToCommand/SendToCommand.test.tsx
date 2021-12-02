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
    expect(screen.getByRole('heading', { name: /send up to command/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Command' })).toBeInTheDocument();
    expect(screen.getByText('Select a command')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeEnabled();
  });

  it('accepts command selection', () => {
    // TODO: figure out how to test React-Dropdown or replace with React-Select
    userEvent.click(screen.getByText(/select a command/i));
    expect(screen.getByText(/battalion commander/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/battalion commander/i));
    expect(screen.getByText(/battalion commander/i)).toBeInTheDocument();
  });

  it('handles submission button correctly', () => {
    userEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
