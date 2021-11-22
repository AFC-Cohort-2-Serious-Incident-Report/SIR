import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node';
// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import SirForm from './SirForm';

const server = setupServer(
  rest.post('/api/incidents', (req, res, ctx) => res(ctx.json({ location: 'Thanks for your submission' }))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SirForm', () => {
  beforeEach(() => {
    render(<SirForm />);
  });

  it('renders components correctly', () => {
    expect(screen.getByRole('textbox', { name: /incident location/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.queryByText('Incident Report Submitted')).not.toBeInTheDocument();
  });

  it('accepts location text', () => {
    userEvent.type(screen.getByRole('textbox', { name: /incident location/i }), 'Test text');
    expect(screen.getByRole('textbox', { name: /incident location/i })).toHaveValue('Test text');
  });

  it('button submits location', async () => {
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => (expect(screen.getByText('Incident Report Submitted')).toBeInTheDocument()));
  });
});
