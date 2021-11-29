import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomAlert, { AlertType } from './CustomAlert';

test('Custom alert renders visually', async () => {
  const onCloseHandler = () => undefined;
  const alertType = AlertType.SUCCESS;
  const text = 'This is a test';
  render(<CustomAlert
    onClose={onCloseHandler}
    alertType={alertType}
    text={text}
  />);
  expect(screen.getByTestId('alert-container')).toBeInTheDocument();
});

test('Custom alert renders visually with error class', async () => {
  const onCloseHandler = () => undefined;
  const alertType = AlertType.ERROR;
  const text = 'This is a test';
  render(<CustomAlert
    onClose={onCloseHandler}
    alertType={alertType}
    text={text}
  />);
  expect(screen.getByTestId('alert-container')).toHaveClass('alert-error');
});
