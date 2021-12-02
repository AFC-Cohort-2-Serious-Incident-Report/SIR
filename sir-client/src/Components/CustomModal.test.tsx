import React, { ReactElement } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomModal from './CustomModal';

describe('CustomModal', () => {
  const modalCloseFn = jest.fn();
  const modalSubmitFn = jest.fn();
  const modalSubmitText = 'Link Text';
  const modalTitleText = 'This is a Modal';
  const modalContent: ReactElement = <h2>Test Content</h2>;

  beforeEach(() => {
    render(
      <CustomModal
        onModalClose={modalCloseFn}
        onModalSubmit={{
          onSubmit: modalSubmitFn,
          text: modalSubmitText,
        }}
        modalTitle={modalTitleText}
        modalContent={modalContent}
      />,
    );
  });

  test('renders expected elements', () => {
    expect(screen.getByRole('heading', { name: modalTitleText })).toBeInTheDocument();
    expect(screen.getByTestId('modal-close-button')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Test Content' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: modalSubmitText })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
  });

  it('should trigger passed function when modal-close-button is clicked', () => {
    userEvent.click(screen.getByTestId('modal-close-button'));
    expect(modalCloseFn).toHaveBeenCalled();
  });

  it('should trigger passed function when submit is clicked', () => {
    userEvent.click(screen.getByRole('button', { name: modalSubmitText }));
    expect(modalSubmitFn).toHaveBeenCalled();
  });

  it('should trigger passed function when submit is clicked', () => {
    userEvent.click(screen.getByRole('button', { name: 'CANCEL' }));
    expect(modalCloseFn).toHaveBeenCalled();
  });

  afterEach(() => {
    modalSubmitFn.mockClear();
    modalCloseFn.mockClear();
  });
});
