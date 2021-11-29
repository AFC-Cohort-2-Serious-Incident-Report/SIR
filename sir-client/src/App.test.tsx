import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders reporter and responder links with reporter focused', async () => {
  // TODO - test here for each respective title once title story happens - JP

  // render App
  render(<App />);
  const reporterLink = screen.getByRole('link', { name: /Reporter/i });
  const responderLink = screen.getByRole('link', { name: /Responder/i });
  // assert App loads with default nav elements
  expect(reporterLink).toBeInTheDocument();
  expect(responderLink).toBeInTheDocument();
  expect(screen.getByTestId('swfLogo')).toBeInTheDocument();
  // assert reporterLink is focused
  expect(reporterLink).toHaveClass('focused');
  expect(responderLink).toHaveClass('unfocused');
  expect(screen.getByRole('heading', { name: /Incident Report Form/i })).toBeInTheDocument();
  expect(screen.queryByText(/Incident Reports/i)).not.toBeInTheDocument();
  // click responderLink
  await userEvent.click(responderLink);
  // assert responderLink is focused
  expect(reporterLink).toHaveClass('unfocused');
  expect(responderLink).toHaveClass('focused');
  expect(screen.queryByText(/Incident Report Form/i)).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Incident Reports/i })).toBeInTheDocument();
  // click reporterLink
  await userEvent.click(reporterLink);
  // assert reporterLink is focused
  expect(reporterLink).toHaveClass('focused');
  expect(responderLink).toHaveClass('unfocused');
  expect(screen.getByRole('heading', { name: /Incident Report Form/i })).toBeInTheDocument();
  expect(screen.queryByText(/Incident Reports/i)).not.toBeInTheDocument();
});
