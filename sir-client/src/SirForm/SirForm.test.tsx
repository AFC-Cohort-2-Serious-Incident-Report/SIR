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

function convertDate(date: Date): string {
  const today = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate().toString().padStart(2, '0')}`;
  return today;
}

const initialValuesMinusObjects = {
  incidentDate: convertDate(new Date()),
  incidentTime: '',
  incidentLocation: '',
  eventType: 'Actual Event / Incident',
  harmOrPotentialHarm: 'false',
  effectOnIndividual: 'No Harm Sustained',
  witnessOneName: '',
  witnessOnePhone: '',
  witnessTwoName: '',
  witnessTwoPhone: '',
  witnessThreeName: '',
  witnessThreePhone: '',
  departmentsInvolved: '',
  incidentDescription: '',
  preventativeAction: '',
};

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
  userEvent.type(screen.getByTestId('chip-input'), 'Medication Related');
  userEvent.click(screen.getByTestId('add-chip-button'));
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
    expect(screen.getByRole('checkbox', { name: /patient/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /family Member/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /adult/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /child/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /staff Member/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /visitor/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /volunteer/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /other/i })).not.toBeChecked();

    // Type of Event
    expect(screen.getByTestId('chip-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-chip-button')).toBeInTheDocument();

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
  it('accepts date entry', async () => {
    userEvent.type(screen.getByLabelText(/date of event/i), '1958-08-08');
    await waitFor(() => expect(screen.getByLabelText(/date of event/i)).toHaveValue('1958-08-08'));
  });

  // Time of Event
  it('accepts time entry', async () => {
    userEvent.type(screen.getByLabelText(/time of event/i), '09:15 PM');
    await waitFor(() => expect(screen.getByLabelText(/time of event/i)).toHaveValue('09:15'));
  });

  // Location of Event
  it('accepts incidentLocation string', async () => {
    userEvent.type(screen.getByRole('textbox', { name: /incident location/i }), 'Test text');
    await waitFor(() => expect(screen.getByRole('textbox', { name: /incident location/i })).toHaveValue('Test text'));
  });

  // Event Type
  it('accepts eventType selection', async () => {
    userEvent.selectOptions(screen.getByRole('combobox', { name: /event type/i }), 'Actual Event / Incident');
    await waitFor(() => expect(screen.getByRole('combobox', { name: /event type/i })).toHaveValue('Actual Event / Incident'));
  });

  // Harm or Potential Harm
  it('accepts harmOrPotentialHarm selection', async () => {
    userEvent.selectOptions(screen.getByRole('combobox', { name: /harm or potential harm/i }), 'Yes');
    await waitFor(() => expect(screen.getByRole('combobox', { name: /harm or potential harm/i })).toHaveValue('true'));
  });

  // Individuals Involved
  it('accepts individualsInvolved.patient selection', async () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.patient/i));
    await waitFor(() => expect(screen.getByRole('checkbox', { name: /patient/i })).toBeChecked());
  });
  it('accepts individualsInvolved.familyMember selection', async () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.familyMember/i));
    await waitFor(() => expect(screen.getByRole('checkbox', { name: /family Member/i })).toBeChecked());
  });
  it('accepts individualsInvolved.adult selection', async () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.familyMember/i));
    userEvent.click(screen.getByTitle(/individualsInvolved.adult/i));
    await waitFor(() => expect(screen.getByRole('checkbox', { name: /adult/i })).toBeChecked());
  });
  it('accepts individualsInvolved.child selection', async () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.familyMember/i));
    userEvent.click(screen.getByTitle(/individualsInvolved.child/i));
    await waitFor(() => expect(screen.getByRole('checkbox', { name: /child/i })).toBeChecked());
  });
  it('accepts individualsInvolved.staffMember selection', async () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.staffMember/i));
    await waitFor(() => expect(screen.getByRole('checkbox', { name: /staff Member/i })).toBeChecked());
  });
  it('accepts individualsInvolved.visitor selection', async () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.visitor/i));
    await waitFor(() => expect(screen.getByRole('checkbox', { name: /visitor/i })).toBeChecked());
  });
  it('accepts individualsInvolved.volunteer selection', async () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.volunteer/i));
    await waitFor(() => expect(screen.getByRole('checkbox', { name: /volunteer/i })).toBeChecked());
  });
  it('accepts individualsInvolved.other selection', async () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.other/i));
    await waitFor(() => expect(screen.getByRole('checkbox', { name: /other/i })).toBeChecked());
  });

  it('disables Adult and Child inputs until Family Member is checked', async () => {
    expect(screen.getByRole('checkbox', { name: /adult/i })).toBeDisabled();
    expect(screen.getByRole('checkbox', { name: /child/i })).toBeDisabled();
    userEvent.click(screen.getByTitle(/familyMember/i));
    await waitFor(() => expect(screen.getByRole('checkbox', { name: /adult/i })).not.toBeDisabled());
    expect(screen.getByRole('checkbox', { name: /child/i })).not.toBeDisabled();
  });

  it('conditionally unchecks Adult and Child inputs when Family Member is unchecked', async () => {
    userEvent.click(screen.getByTitle(/individualsInvolved.familyMember/i));
    userEvent.click(screen.getByTitle(/individualsInvolved.adult/i));
    userEvent.click(screen.getByTitle(/individualsInvolved.child/i));
    userEvent.click(screen.getByTitle(/individualsInvolved.familyMember/i));
    await waitFor(() => expect(screen.getByRole('checkbox', { name: /adult/i })).not.toBeChecked());
    expect(screen.getByRole('checkbox', { name: /child/i })).not.toBeChecked();
  });

  // Type of Event
  it('add and remove multiple typeOfEvent with chips rendering', async () => {
    userEvent.type(screen.getByTestId('chip-input'), 'Adverse Drug Reaction');
    userEvent.click(screen.getByTestId('add-chip-button'));
    await waitFor(() => expect(screen.getByTestId(/id-adverse drug reaction/i)).toBeInTheDocument());
    expect(screen.getByTestId('chip-input')).toHaveValue('');
    userEvent.type(screen.getByTestId('chip-input'), 'Fried Potato Overdose');
    userEvent.click(screen.getByTestId('add-chip-button'));
    await waitFor(() => expect(screen.getByTestId(/id-fried potato overdose/i)).toBeInTheDocument());
    userEvent.click(screen.getByTestId(/id-adverse drug reaction/i));
    await waitFor(() => expect(screen.queryByTestId(/id-adverse drug reaction/i)).not.toBeInTheDocument());
  });

  // Effect of this incident on the individual(s) involved
  it('accepts effectOnIndividual selection', async () => {
    userEvent.selectOptions(screen.getByRole('combobox', { name: /effect of this incident on the individual\(s\) involved/i }), 'No Harm Sustained');
    await waitFor(() => expect(screen.getByRole('combobox', { name: /effect of this incident on the individual\(s\) involved/i })).toHaveValue('No Harm Sustained'));
  });

  // Witness info (3 witnesses)
  it('accepts witness one name', async () => {
    userEvent.type(screen.getByTitle(/witnessOneName/i), 'Sir Jackman');
    await waitFor(() => expect(screen.getByTitle(/witnessOneName/i)).toHaveValue('Sir Jackman'));
  });

  it('accepts witness one phone', async () => {
    userEvent.type(screen.getByTitle(/witnessOnePhone/i), '719-526-6778');
    await waitFor(() => expect(screen.getByTitle(/witnessOnePhone/i)).toHaveValue('719-526-6778'));
  });

  it('accepts witness two name', async () => {
    userEvent.type(screen.getByTitle(/witnessTwoName/i), 'Hugh Jass');
    await waitFor(() => expect(screen.getByTitle(/witnessTwoName/i)).toHaveValue('Hugh Jass'));
  });

  it('accepts witness two phone', async () => {
    userEvent.type(screen.getByTitle(/witnessTwoPhone/i), '910-585-8101');
    await waitFor(() => expect(screen.getByTitle(/witnessTwoPhone/i)).toHaveValue('910-585-8101'));
  });
  it('accepts witness three name', async () => {
    userEvent.type(screen.getByTitle(/witnessThreeName/i), 'Chuck Norris');
    await waitFor(() => expect(screen.getByTitle(/witnessThreeName/i)).toHaveValue('Chuck Norris'));
  });
  it('accepts witness three phone', async () => {
    userEvent.type(screen.getByTitle(/witnessThreePhone/i), '585-888-1101');
    await waitFor(() => expect(screen.getByTitle(/witnessThreePhone/i)).toHaveValue('585-888-1101'));
  });

  // Departments Involved
  it('accepts departmentsInvolved string', async () => {
    userEvent.type(screen.getByRole('textbox', { name: /department\(s\) involved/i }), 'Ambulatory Care, Emergency Care');
    await waitFor(() => expect(screen.getByRole('textbox', { name: /department\(s\) involved/i })).toHaveValue('Ambulatory Care, Emergency Care'));
  });

  // Description of Incident
  it('accepts incidentDescription string', async () => {
    userEvent.type(screen.getByRole('textbox', { name: /description of incident/i }), 'Test text');
    await waitFor(() => expect(screen.getByRole('textbox', { name: /description of incident/i })).toHaveValue('Test text'));
  });

  // Preventative Actions Taken
  it('accepts preventativeAction string', async () => {
    userEvent.type(screen.getByRole('textbox', { name: /what actions, if any, could have been taken to prevent this incident from occurring?/i }), 'Test text');
    await waitFor(() => expect(screen.getByRole('textbox', { name: /what actions, if any, could have been taken to prevent this incident from occurring?/i })).toHaveValue('Test text'));
  });

  // Patient Info (4 Fields)
  it('accepts patientInfo.patientName string', async () => {
    userEvent.type(screen.getByRole('textbox', { name: /patient name/i }), 'Chuck Norris');
    await waitFor(() => expect(screen.getByRole('textbox', { name: /patient name/i })).toHaveValue('Chuck Norris'));
  });

  it('accepts patientInfo.patientSocial string', async () => {
    userEvent.type(screen.getByRole('textbox', { name: /patient ssn/i }), '111-11-1111');
    await waitFor(() => expect(screen.getByRole('textbox', { name: /patient ssn/i })).toHaveValue('111-11-1111'));
  });

  it('accepts patientInfo.patientPhone string', async () => {
    userEvent.type(screen.getByRole('textbox', { name: /patient telephone number/i }), '111-111-1111');
    await waitFor(() => expect(screen.getByRole('textbox', { name: /patient telephone number/i })).toHaveValue('111-111-1111'));
  });

  it('accepts patientInfo.patientAddress string', async () => {
    userEvent.type(screen.getByRole('textbox', { name: /patient address/i }), '123 Main St');
    await waitFor(() => expect(screen.getByRole('textbox', { name: /patient address/i })).toHaveValue('123 Main St'));
  });

  // Button and alert tests
  it('button is disabled until all required fields have text', async () => {
    fillAllFields();
    await waitFor(() => expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled());
  });
  it('button submits all fields', async () => {
    window.scrollTo = jest.fn();
    fillAllFields();
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => (expect(screen.getByText('Incident Report Submitted')).toBeInTheDocument()));
  });
  it('page scrolls to top to view alert banner upon submission', async () => {
    window.scrollTo = jest.fn();
    fillAllFields();
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      expect(window.scrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 0 });
    });
  });
  it('X button closes alert banner', async () => {
    window.scrollTo = jest.fn();
    fillAllFields();
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => (expect(screen.getByText('Incident Report Submitted')).toBeInTheDocument()));
    userEvent.click(screen.getByTitle(/close alert/i));
    await waitFor(() => (expect(screen.queryByTitle('close alert')).not.toBeInTheDocument()));
  });
  // Form Resets after submission
  it('Resets all fields after submission', async () => {
    window.scrollTo = jest.fn();
    fillAllFields();
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => (expect(screen.getByTitle('sir-form')).toHaveFormValues(initialValuesMinusObjects)));

    expect(screen.getByTestId('chip-input')).toHaveValue('');
    expect(screen.queryByAltText('chip-close-button')).not.toBeInTheDocument();

    await waitFor(() => (expect(screen.queryByAltText('chip-close-button')).not.toBeInTheDocument()));
    await waitFor(() => screen.getAllByRole('checkbox').forEach((val) => {
      expect(val).not.toBeChecked();
    }));
    await waitFor(() => screen.getAllByTitle(/^patientinfo/i).forEach((value) => {
      expect(value).toHaveValue('');
    }));
  });
  // Form displays error banner if submission is not successful
  it('Displays Error Alert Banner if submission is not successful', async () => {
    window.scrollTo = jest.fn();
    fillAllFields();
    server.use(
      rest.post('/api/incidents', (
        req,
        res,
        ctx,
      ) => res(ctx.status(400))),
    );
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText(/Error Occurred While Submitting the Incident Report/i));
  });
});
