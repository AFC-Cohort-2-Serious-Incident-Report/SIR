import {
  findByDisplayValue, render, screen, waitFor,
} from '@testing-library/react';
import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import assert from 'assert';
import SirForm from '../SirForm/SirForm';
import SendToCommand from './SendToCommand';

describe('Send To Command Modal', () => {
  const handleSubmit = jest.fn();
  const closeModal = jest.fn();
  beforeEach(() => {
    render(<SendToCommand
      onSubmit={handleSubmit}
      showModal
      closeModal={closeModal}
    />);
  });

  it('renders components correctly', async () => {
    expect(screen.queryByText(/^send up to command$/i)).toBeInTheDocument();
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
    expect(screen.getByTitle(/^command$/i)).toBeInTheDocument();
    expect(screen.getByText(/^select a command$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeEnabled();
  });

  it('accepts command selection', async () => {
    userEvent.click(screen.getByText(/^select a command$/i));
    await waitFor(() => userEvent.click(screen.getByText(/battalion commander/i)));
    expect(screen.getByText(/^battalion commander$/i));
  });

  it('send button does not function when item not selected', async () => {
    userEvent.click(screen.getByRole('button', { name: /^send$/i }));
    await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled());
  });

  it('submit button use the provided callback when user selects a command', async () => {
    userEvent.click(screen.getByText(/^select a command$/i));
    expect(screen.getByText(/battalion commander/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/battalion commander/i));
    userEvent.click(screen.getByRole('button', { name: /^send$/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalled());
  });
});
