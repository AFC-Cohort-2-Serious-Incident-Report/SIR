import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import SirForm from './SirForm';

const server = setupServer(
  rest.post('/api/incidents', (req, res, ctx) => res(ctx.json({ location: 'Thanks for your submission' }))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function fillAllFields() {
  userEvent.type(screen.getByLabelText(/date of event/i), '1958-08-08');
  userEvent.type(screen.getByLabelText(/time of event/i), '09:15 PM');
  userEvent.type(screen.getByRole('selectbox', { name: /event type/i }), 'Actual Event / Incident');
  userEvent.type(screen.getByRole('textbox', { name: /incident location/i }), 'Test text');
  userEvent.type(screen.getByRole('textbox', { name: /incident description/i }), 'Test text');
  userEvent.type(screen.getByRole('textbox', { name: /preventative action/i }), 'Test text');
}

describe('SirForm', () => {
  beforeEach(() => {
    render(<SirForm />);
  });

  it('renders components correctly', () => {
    expect(screen.getByLabelText(/date of event/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time of event/i)).toBeInTheDocument();
    expect(screen.getByRole('selectbox', { name: /event type/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /incident location/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /incident description/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /preventative action/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
    expect(screen.queryByText('Incident Report Submitted')).not.toBeInTheDocument();
  });

  it('accepts date entry', () => {
    userEvent.type(screen.getByLabelText(/date of event/i), '1958-08-08');
    expect(screen.getByLabelText(/date of event/i)).toHaveValue('1958-08-08');
  });

  it('accepts time entry', () => {
    userEvent.type(screen.getByLabelText(/time of event/i), '09:15 PM');
    expect(screen.getByLabelText(/time of event/i)).toHaveValue('09:15');
  });

  it('accepts event type string', () => {
    userEvent.type(screen.getByRole('selectbox', { name: /event type/i }), 'Actual Event / Incident');
    expect(screen.getByRole('selectbox', { name: /event type/i })).toHaveValue('Actual Event / Incident');
  });

  it('accepts incidentLocation string', () => {
    userEvent.type(screen.getByRole('textbox', { name: /incident location/i }), 'Test text');
    expect(screen.getByRole('textbox', { name: /incident location/i })).toHaveValue('Test text');
  });

  it('accepts incidentDescription string', () => {
    userEvent.type(screen.getByRole('textbox', { name: /incident description/i }), 'Test text');
    expect(screen.getByRole('textbox', { name: /incident description/i })).toHaveValue('Test text');
  });

  it('accepts preventativeAction string', () => {
    userEvent.type(screen.getByRole('textbox', { name: /preventative action/i }), 'Test text');
    expect(screen.getByRole('textbox', { name: /preventative action/i })).toHaveValue('Test text');
  });

  it('button submits all fields', async () => {
    fillAllFields();
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => (expect(screen.getByText('Incident Report Submitted')).toBeInTheDocument()));
  });

  it('button is disabled until all required fields have text', () => {
    fillAllFields();
    expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled();
  });
});
