import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders reporter and responder links with reporter focused', async () => {
  // TODO - test here for each respective title once title story happens - JP

  // render App
  render(<App />);
  const firstLink = screen.getByText(/Reporter/i);
  const secondLink = screen.getByText(/Responder/i);
  const logo = screen.getByTestId('swfLogo');
  // assert App loads with default nav elements
  expect(firstLink).toBeInTheDocument();
  expect(secondLink).toBeInTheDocument();
  expect(logo).toBeInTheDocument();
  // assert firstLink is focused
  expect(firstLink).toHaveClass('focused');
  expect(secondLink).toHaveClass('unfocused');
  // click secondLink
  await userEvent.click(secondLink);
  // assert secondLink is focused
  expect(firstLink).toHaveClass('unfocused');
  expect(secondLink).toHaveClass('focused');
  // click firstLink
  await userEvent.click(firstLink);
  // assert firstLink is focused
  expect(firstLink).toHaveClass('focused');
  expect(secondLink).toHaveClass('unfocused');
});
