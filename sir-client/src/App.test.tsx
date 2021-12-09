import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders reporter and responder links with reporter focused', async () => {
  // render App
  render(<App />);
  // assert App loads with default nav elements
  expect(screen.getByRole('link', { name: /Reporter/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Responder/i })).toBeInTheDocument();
  expect(screen.getByTestId('swfLogo')).toBeInTheDocument();
  // assert screen.getByRole('link', { name: /Reporter/i }) is focused
  expect(screen.getByRole('link', { name: /Reporter/i })).toHaveClass('focused');
  expect(screen.getByRole('link', { name: /Responder/i })).toHaveClass('unfocused');
  expect(screen.getByRole('heading', { name: /Incident Report Form/i })).toBeInTheDocument();
  expect(screen.queryByText(/Incident Reports/i)).not.toBeInTheDocument();
  // click screen.getByRole('link', { name: /Responder/i })
  await userEvent.click(screen.getByRole('link', { name: /Responder/i }));
  // assert screen.getByRole('link', { name: /Responder/i }) is focused
  expect(screen.getByRole('link', { name: /Reporter/i })).toHaveClass('unfocused');
  expect(screen.getByRole('link', { name: /Responder/i })).toHaveClass('focused');
  expect(screen.queryByText(/Incident Report Form/i)).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Incident Reports/i })).toBeInTheDocument();
  // click screen.getByRole('link', { name: /Reporter/i })
  await userEvent.click(screen.getByRole('link', { name: /Reporter/i }));
  // assert screen.getByRole('link', { name: /Reporter/i }) is focused
  expect(screen.getByRole('link', { name: /Reporter/i })).toHaveClass('focused');
  expect(screen.getByRole('link', { name: /Responder/i })).toHaveClass('unfocused');
  expect(screen.getByRole('heading', { name: /Incident Report Form/i })).toBeInTheDocument();
  expect(screen.queryByText(/Incident Reports/i)).not.toBeInTheDocument();
});
