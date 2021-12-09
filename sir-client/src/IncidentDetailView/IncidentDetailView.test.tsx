import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import IncidentDetailView from './IncidentDetailView';
import testData from '../sir_test_data.json';

const server = setupServer(
  rest.get(
    '/api/incidents/*',
    (
      req,
      res,
      ctx,
    ) => res(ctx.json(testData)),
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('IncidentDetailView', () => {
  beforeEach(() => {
    render(<IncidentDetailView
      id={1}
      onClose={() => null}
      onSubmitUpdate={() => null}
      onErrorClose={() => null}
    />);
  });

  it('renders inside of modal with incident detail properties', async () => {
    expect(await screen.findByRole('heading', { name: 'Incident Report' })).toBeInTheDocument();
    expect(screen.getByTestId('modal-close-button')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('renders sirform without header or submit', () => {
    expect(screen.queryByRole('heading', { name: /Incident Report Form/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /submit/i })).toBeNull();
  });

  it('renders SIR form with fields populated from existing SIR', async () => {
    expect(await screen.findByLabelText(/date of event/i)).toHaveValue(testData.incidentDate);
    expect(screen.getByLabelText(/time of event/i)).toHaveValue(testData.incidentTime);
    expect(screen.getByRole('textbox', { name: /incident location/i })).toHaveValue(testData.incidentLocation);
    expect(screen.getByRole('combobox', { name: /incident type/i })).toHaveValue(testData.eventType);
    expect(screen.getByRole('combobox', { name: /incident type/i })).toHaveValue(testData.eventType);
    expect(screen.getByRole('combobox', {
      name: /harm or potential harm/i,
    })).toHaveValue(testData.harmOrPotentialHarm.toString());
    expect(screen.getByRole('checkbox', { name: /patient/i })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: /family member/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /adult/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /child/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /staff member/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /visitor/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /volunteer/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /other/i })).toBeChecked();
    expect(screen.getByTestId(/id-adverse drug reaction/i)).toBeInTheDocument();
    expect(screen.getByTestId(/id-medication related/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', {
      name: /effect of this incident on the individual\(s\) involved/i,
    })).toHaveValue(testData.effectOnIndividual);
    expect(screen.getByTitle(/witnessOneName/i)).toHaveValue(testData.witnessOneName);
    expect(screen.getByTitle(/witnessOnePhone/i)).toHaveValue(testData.witnessOnePhone);
    expect(screen.getByTitle(/witnessTwoName/i)).toHaveValue(testData.witnessTwoName);
    expect(screen.getByTitle(/witnessTwoPhone/i)).toHaveValue(testData.witnessTwoPhone);
    expect(screen.getByTitle(/witnessThreeName/i)).toHaveValue(testData.witnessThreeName);
    expect(screen.getByTitle(/witnessThreePhone/i)).toHaveValue(testData.witnessThreePhone);
    expect(screen.getByTestId('chip-input-departments-involved')).toBeInTheDocument();
    expect(screen.getByTestId('add-chip-button-departments-involved')).toBeInTheDocument();
    expect(screen.getByTestId(`id-${testData.departmentsInvolved[0]}`)).toBeInTheDocument();
    expect(screen.getByTestId(`id-${testData.departmentsInvolved[1]}`)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /description of incident/i })).toHaveValue(testData.incidentDescription);
    expect(screen.getByRole('textbox', {
      name: /what actions, if any, could have been taken to prevent this incident from occurring?/i,
    })).toHaveValue(testData.preventativeAction);
    expect(screen.getByRole('textbox', { name: /patient name/i })).toHaveValue(testData.patientInfo.patientName);
    expect(screen.getByRole('textbox', { name: /patient ssn/i })).toHaveValue(testData.patientInfo.patientSocial);
    expect(screen.getByRole('textbox', {
      name: /patient telephone number/i,
    })).toHaveValue(testData.patientInfo.patientPhone);
    expect(screen.getByRole('textbox', { name: /patient address/i })).toHaveValue(testData.patientInfo.patientAddress);
    expect(screen.getByTestId('chip-input-type-of-event')).toBeInTheDocument();
    expect(screen.getByTestId('add-chip-button-type-of-event')).toBeInTheDocument();
    expect(screen.getByTestId(`id-${testData.typeOfEvent[0]}`)).toBeInTheDocument();
    expect(screen.getByTestId(`id-${testData.typeOfEvent[1]}`)).toBeInTheDocument();
  });
});
