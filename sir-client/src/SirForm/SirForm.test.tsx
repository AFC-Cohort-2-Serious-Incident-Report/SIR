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
  userEvent.selectOptions(screen.getByRole('combobox', { name: /event type/i }), 'Actual Event / Incident');
  userEvent.selectOptions(screen.getByRole('combobox', { name: /harm or potential harm/i }), 'Yes');
  userEvent.type(screen.getByTitle(/witnessOneName/i), 'Sir Jackman');
  userEvent.type(screen.getByTitle(/witnessOnePhone/i), '719-526-6778');
  userEvent.type(screen.getByTitle(/witnessTwoName/i), 'Hugh Jass');
  userEvent.type(screen.getByTitle(/witnessTwoPhone/i), '910-585-8101');
  userEvent.type(screen.getByTitle(/witnessThreeName/i), 'Chuck Norris');
  userEvent.type(screen.getByTitle(/witnessThreePhone/i), '585-888-1101');
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
    expect(screen.getByRole('textbox', { name: /incident location/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /event type/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /harm or potential harm/i })).toHaveValue('false');
    // Individuals Involved
    // Type of Event
    // Effect on Individual
    expect(screen.getByTitle(/witnessOneName/i)).toBeInTheDocument();
    expect(screen.getByTitle(/witnessOnePhone/i)).toBeInTheDocument();
    expect(screen.getByTitle(/witnessTwoName/i)).toBeInTheDocument();
    expect(screen.getByTitle(/witnessTwoPhone/i)).toBeInTheDocument();
    expect(screen.getByTitle(/witnessThreeName/i)).toBeInTheDocument();
    expect(screen.getByTitle(/witnessThreePhone/i)).toBeInTheDocument();
    // Departments involved
    expect(screen.getByRole('textbox', { name: /incident description/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /preventative action/i })).toBeInTheDocument();
    // Patient Info (5 Fields)
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

  it('accepts event type selection', () => {
    userEvent.selectOptions(screen.getByRole('combobox', { name: /event type/i }), 'Actual Event / Incident');
    expect(screen.getByRole('combobox', { name: /event type/i })).toHaveValue('Actual Event');
  });

  it('accepts harm or potential harm selection', () => {
    userEvent.selectOptions(screen.getByRole('combobox', { name: /harm or potential harm/i }), 'Yes');
    expect(screen.getByRole('combobox', { name: /harm or potential harm/i })).toHaveValue('true');
  });

  it('accepts witness one name', () => {
    userEvent.type(screen.getByTitle(/witnessOneName/i), 'Sir Jackman');
    expect(screen.getByTitle(/witnessOneName/i)).toHaveValue('Sir Jackman');
  });

  it('accepts witness one phone', () => {
    userEvent.type(screen.getByTitle(/witnessOnePhone/i), '719-526-6778');
    expect(screen.getByTitle(/witnessOnePhone/i)).toHaveValue('719-526-6778');
  });

  it('accepts witness two name', () => {
    userEvent.type(screen.getByTitle(/witnessTwoName/i), 'Hugh Jass');
    expect(screen.getByTitle(/witnessTwoName/i)).toHaveValue('Hugh Jass');
  });

  it('accepts witness two phone', () => {
    userEvent.type(screen.getByTitle(/witnessTwoPhone/i), '910-585-8101');
    expect(screen.getByTitle(/witnessTwoPhone/i)).toHaveValue('910-585-8101');
  });

  it('accepts witness three name', () => {
    userEvent.type(screen.getByTitle(/witnessThreeName/i), 'Chuck Norris');
    expect(screen.getByTitle(/witnessThreeName/i)).toHaveValue('Chuck Norris');
  });

  it('accepts witness three phone', () => {
    userEvent.type(screen.getByTitle(/witnessThreePhone/i), '585-888-1101');
    expect(screen.getByTitle(/witnessThreePhone/i)).toHaveValue('585-888-1101');
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
