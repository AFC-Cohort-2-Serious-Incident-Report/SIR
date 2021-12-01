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
  // Date of Event
  userEvent.type(screen.getByLabelText(/date of event/i), '1958-08-08');
  // Time of Event
  userEvent.type(screen.getByLabelText(/time of event/i), '09:15 PM');
  // Location of Event
  userEvent.type(screen.getByRole('textbox', { name: /incident location/i }), 'Test text');
  // Event Type
  userEvent.selectOptions(screen.getByRole('combobox', { name: /event type/i }), 'Actual Event / Incident');
  // Harm or Potential Harm
  userEvent.selectOptions(screen.getByRole('combobox', { name: /harm or potential harm/i }), 'Yes');
  // Individuals Involved
  userEvent.click(screen.getByTitle(/individualsInvolved.patient/i));
  userEvent.click(screen.getByTitle(/individualsInvolved.familyMember/i));
  userEvent.click(screen.getByTitle(/individualsInvolved.adult/i));
  userEvent.click(screen.getByTitle(/individualsInvolved.child/i));
  userEvent.click(screen.getByTitle(/individualsInvolved.staffMember/i));
  userEvent.click(screen.getByTitle(/individualsInvolved.visitor/i));
  userEvent.click(screen.getByTitle(/individualsInvolved.volunteer/i));
  userEvent.click(screen.getByTitle(/individualsInvolved.other/i));
  // Type of Event
  userEvent.type(screen.getByRole('textbox', { name: /type of event/i }), 'Adverse Drug Reaction, Medication Related');
  // Effect of this incident on the individual(s) involved
  userEvent.selectOptions(screen.getByRole('combobox', { name: /effect of this incident on the individual\(s\) involved/i }), 'No Harm Sustained');
  // Witness Info
  userEvent.type(screen.getByTitle(/witnessOneName/i), 'Sir Jackman');
  userEvent.type(screen.getByTitle(/witnessOnePhone/i), '719-526-6778');
  userEvent.type(screen.getByTitle(/witnessTwoName/i), 'Hugh Jackman');
  userEvent.type(screen.getByTitle(/witnessTwoPhone/i), '910-585-8101');
  userEvent.type(screen.getByTitle(/witnessThreeName/i), 'Chuck Norris');
  userEvent.type(screen.getByTitle(/witnessThreePhone/i), '585-888-1101');
  // Departments Involved
  userEvent.type(screen.getByRole('textbox', { name: /department\(s\) involved/i }), 'Ambulatory Care, Emergency Care');
  // Description of Incident
  userEvent.type(screen.getByRole('textbox', { name: /description of incident/i }), 'Test text');
  // Preventative Actions Taken
  userEvent.type(screen.getByRole('textbox', { name: /what actions, if any, could have been taken to prevent this incident from occurring?/i }), 'Test text');
  // Patient Info
  userEvent.type(screen.getByRole('textbox', { name: /patient name/i }), 'Chuck Norris');
  userEvent.type(screen.getByRole('textbox', { name: /patient ssn/i }), '111-11-1111');
  userEvent.type(screen.getByRole('textbox', { name: /patient telephone number/i }), '111-111-1111');
  userEvent.type(screen.getByRole('textbox', { name: /patient address/i }), '123 Main St');
}

describe('SirForm', () => {
  beforeEach(() => {
    render(<SirForm />);
  });

  it('renders components correctly', () => {
    // Date of Event
    expect(screen.getByLabelText(/date of event/i)).toBeInTheDocument();
    // Time of Event
    expect(screen.getByLabelText(/time of event/i)).toBeInTheDocument();
    // Location of Event
    expect(screen.getByRole('textbox', { name: /incident location/i })).toBeInTheDocument();
    // Event Type
    expect(screen.getByRole('combobox', { name: /event type/i })).toBeInTheDocument();
    // Harm or Potential Harm
    expect(screen.getByRole('combobox', { name: /harm or potential harm/i })).toHaveValue('false');
    // Individuals Involved
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.patient/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.familyMember/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.adult/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.child/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.staffMember/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.visitor/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.volunteer/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.other/i })).not.toBeChecked();
    // Type of Event
    expect(screen.getByRole('textbox', { name: /type of event/i })).toBeInTheDocument();
    // Effect of this incident on the individual(s) involved
    expect(screen.getByRole('combobox', { name: /effect of this incident on the individual\(s\) involved/i })).toBeInTheDocument();
    // Witness Info
    expect(screen.getByTitle(/witnessOneName/i)).toBeInTheDocument();
    expect(screen.getByTitle(/witnessOnePhone/i)).toBeInTheDocument();
    expect(screen.getByTitle(/witnessTwoName/i)).toBeInTheDocument();
    expect(screen.getByTitle(/witnessTwoPhone/i)).toBeInTheDocument();
    expect(screen.getByTitle(/witnessThreeName/i)).toBeInTheDocument();
    expect(screen.getByTitle(/witnessThreePhone/i)).toBeInTheDocument();
    // Departments Involved
    expect(screen.getByRole('textbox', { name: /department\(s\) involved/i })).toBeInTheDocument();
    // Description of Event
    expect(screen.getByRole('textbox', { name: /description of incident/i })).toBeInTheDocument();
    // Preventative Actions Taken
    expect(screen.getByRole('textbox', { name: /what actions, if any, could have been taken to prevent this incident from occurring?/i })).toBeInTheDocument();
    // Patient Info
    expect(screen.getByRole('textbox', { name: /patient name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /patient ssn/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /patient telephone number/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /patient address/i })).toBeInTheDocument();
    // Button
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
    expect(screen.queryByText('Incident Report Submitted')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Incident Report Form/i }));
  });

  // Individual field tests
  // Date of Event
  it('accepts date entry', () => {
    userEvent.type(screen.getByLabelText(/date of event/i), '1958-08-08');
    expect(screen.getByLabelText(/date of event/i)).toHaveValue('1958-08-08');
  });

  // Time of Event
  it('accepts time entry', () => {
    userEvent.type(screen.getByLabelText(/time of event/i), '09:15 PM');
    expect(screen.getByLabelText(/time of event/i)).toHaveValue('09:15');
  });

  // Location of Event
  it('accepts incidentLocation string', () => {
    userEvent.type(screen.getByRole('textbox', { name: /incident location/i }), 'Test text');
    expect(screen.getByRole('textbox', { name: /incident location/i })).toHaveValue('Test text');
  });

  // Event Type
  it('accepts eventType selection', () => {
    userEvent.selectOptions(screen.getByRole('combobox', { name: /event type/i }), 'Actual Event / Incident');
    expect(screen.getByRole('combobox', { name: /event type/i })).toHaveValue('Actual Event');
  });

  // Harm or Potential Harm
  it('accepts harmOrPotentialHarm selection', () => {
    userEvent.selectOptions(screen.getByRole('combobox', { name: /harm or potential harm/i }), 'Yes');
    expect(screen.getByRole('combobox', { name: /harm or potential harm/i })).toHaveValue('true');
  });

  // Individuals Involved
  it('accepts individualsInvolved.patient selection', () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.patient/i));
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.patient/i })).toBeChecked();
  });
  it('accepts individualsInvolved.familyMember selection', () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.familyMember/i));
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.familyMember/i })).toBeChecked();
  });
  it('accepts individualsInvolved.adult selection', () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.adult/i));
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.adult/i })).toBeChecked();
  });
  it('accepts individualsInvolved.child selection', () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.child/i));
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.child/i })).toBeChecked();
  });
  it('accepts individualsInvolved.staffMember selection', () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.staffMember/i));
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.staffMember/i })).toBeChecked();
  });
  it('accepts individualsInvolved.visitor selection', () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.visitor/i));
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.visitor/i })).toBeChecked();
  });
  it('accepts individualsInvolved.volunteer selection', () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.volunteer/i));
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.volunteer/i })).toBeChecked();
  });
  it('accepts individualsInvolved.other selection', () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.other/i));
    expect(screen.getByRole('checkbox', { name: /individualsInvolved.other/i })).toBeChecked();
  });

  // Type of Event
  it('accepts typeOfEvent string', () => {
    userEvent.type(screen.getByRole('textbox', { name: /type of event/i }), 'Adverse Drug Reaction, Medication Related');
    expect(screen.getByRole('textbox', { name: /type of event/i })).toHaveValue('Adverse Drug Reaction, Medication Related');
  });

  // Effect of this incident on the individual(s) involved
  it('accepts effectOnIndividual selection', () => {
    userEvent.selectOptions(screen.getByRole('combobox', { name: /effect of this incident on the individual\(s\) involved/i }), 'No Harm Sustained');
    expect(screen.getByRole('combobox', { name: /effect of this incident on the individual\(s\) involved/i })).toHaveValue('No Harm Sustained');
  });

  // Witness info (3 witnesses)
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

  // Departments Involved
  it('accepts departmentsInvolved string', () => {
    userEvent.type(screen.getByRole('textbox', { name: /department\(s\) involved/i }), 'Ambulatory Care, Emergency Care');
    expect(screen.getByRole('textbox', { name: /department\(s\) involved/i })).toHaveValue('Ambulatory Care, Emergency Care');
  });

  // Description of Incident
  it('accepts incidentDescription string', () => {
    userEvent.type(screen.getByRole('textbox', { name: /description of incident/i }), 'Test text');
    expect(screen.getByRole('textbox', { name: /description of incident/i })).toHaveValue('Test text');
  });

  // Preventative Actions Taken
  it('accepts preventativeAction string', () => {
    userEvent.type(screen.getByRole('textbox', { name: /what actions, if any, could have been taken to prevent this incident from occurring?/i }), 'Test text');
    expect(screen.getByRole('textbox', { name: /what actions, if any, could have been taken to prevent this incident from occurring?/i })).toHaveValue('Test text');
  });

  // Patient Info (4 Fields)
  it('accepts patientInfo.patientName string', () => {
    userEvent.type(screen.getByRole('textbox', { name: /patient name/i }), 'Chuck Norris');
    expect(screen.getByRole('textbox', { name: /patient name/i })).toHaveValue('Chuck Norris');
  });
  it('accepts patientInfo.patientSocial string', () => {
    userEvent.type(screen.getByRole('textbox', { name: /patient ssn/i }), '111-11-1111');
    expect(screen.getByRole('textbox', { name: /patient ssn/i })).toHaveValue('111-11-1111');
  });
  it('accepts patientInfo.patientPhone string', () => {
    userEvent.type(screen.getByRole('textbox', { name: /patient telephone number/i }), '111-111-1111');
    expect(screen.getByRole('textbox', { name: /patient telephone number/i })).toHaveValue('111-111-1111');
  });
  it('accepts patientInfo.patientAddress string', () => {
    userEvent.type(screen.getByRole('textbox', { name: /patient address/i }), '123 Main St');
    expect(screen.getByRole('textbox', { name: /patient address/i })).toHaveValue('123 Main St');
  });

  // Button and alert tests
  it('button is disabled until all required fields have text', () => {
    fillAllFields();
    expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled();
  });
  it('button submits all fields', async () => {
    fillAllFields();
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => (expect(screen.getByText('Incident Report Submitted')).toBeInTheDocument()));
  });
  it('page scrolls to top to view alert banner upon submission', async () => {
    window.scrollTo = jest.fn();
    fillAllFields();
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => { expect(window.scrollTo).toHaveBeenCalledTimes(1); });
    const expectedY = 0;
    const expectedX = 0;
    const actualY = window.scrollY;
    const actualX = window.scrollX;
    expect(actualX).toBe(expectedX);
    expect(actualY).toBe(expectedY);
  });
  it('X button closes alert banner', async () => {
    fillAllFields();
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => (expect(screen.getByText('Incident Report Submitted')).toBeInTheDocument()));
    userEvent.click(screen.getByTitle(/close alert/i));
    await waitFor(() => (expect(screen.queryByTitle('close alert')).not.toBeInTheDocument()));
  });
});
