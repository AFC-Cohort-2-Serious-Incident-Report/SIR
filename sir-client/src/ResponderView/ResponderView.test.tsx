import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import ResponderView from './ResponderView';
import dataWithOne from '../Incident_Row_Test_Data.json';
import testData from '../sir_test_data.json';

type IncidentRowEntry = {
  id: number;
  incidentDate: string;
  incidentLocation: string;
  harmOrPotentialHarm: boolean;
  eventType: string;
}

type IncidentRowEntries = {
  row: IncidentRowEntry[];
}

describe('ResponderView', () => {
  describe('Responder Table', () => {
    const server = setupServer(
      rest.get('/api/incidents', (req, res, ctx) => res(ctx.json(dataWithOne))),
      rest.get(
        '/api/incidents/1',
        (
          req,
          res,
          ctx,
        ) => res(ctx.json(testData)),
      ),
    );

    beforeAll(() => server.listen());
    beforeEach(() => {
      render(<ResponderView />);
    });
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should render components correctly', () => {
      expect(screen.getByRole('heading', { name: /^incident reports/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /^reports/i })).toBeInTheDocument();
    });

    it('should render table headers', () => {
      expect(screen.getByRole('checkbox', { checked: false }));
      expect(screen.getByText(/^Event Date/i)).toBeInTheDocument();
      expect(screen.getByText(/^Location/i)).toBeInTheDocument();
      // expect(screen.getByText(/^Incident Type/i)).toBeInTheDocument();
      expect(screen.getByText(/^Harm/i)).toBeInTheDocument();
      // expect(screen.getByText('Individual(s) Involved')).toBeInTheDocument();
      expect(screen.getByText(/^Event Type/i)).toBeInTheDocument();
      expect(screen.getByText(/^details/i)).toBeInTheDocument();
    });

    it('should render json for responder', async () => {
      await waitFor(() => expect(screen.getByText('03/27/2021')).toBeInTheDocument());
      expect(screen.getAllByRole('checkbox')).toHaveLength(2);
      expect(screen.getByText('Shouxihu')).toBeInTheDocument();
      expect(screen.getByText('Yes')).toBeInTheDocument();
      expect(screen.getByText('visa')).toBeInTheDocument();
    });

    // Checkbox actions/send to command functions
    it('send up to command bar should render when reports checked', async () => {
      await waitFor(() => expect(screen.getByText('03/27/2021')).toBeInTheDocument());
      expect(screen.getAllByRole('checkbox')).toHaveLength(2);
      userEvent.click((screen.getAllByRole('checkbox')[1]));
      expect(await screen.findByText(/send up to command/i)).toBeInTheDocument();
    });

    it('send up to command bar should disappear when reports unchecked', async () => {
      await waitFor(() => expect(screen.getByText('03/27/2021')).toBeInTheDocument());
      expect(screen.getAllByRole('checkbox')).toHaveLength(2);
      userEvent.click((screen.getAllByRole('checkbox')[1]));
      await waitFor(() => expect(screen.getAllByRole('checkbox')[1]).toBeChecked());
      userEvent.click((screen.getAllByRole('checkbox')[1]));
      await waitFor(() => expect(screen.getAllByRole('checkbox')[1]).not.toBeChecked());
      expect(screen.queryByText(/send up to command/i)).not.toBeInTheDocument();
    });

    it('display the number of selected reports when reports are selected', async () => {
      await waitFor(() => expect(screen.getByText('03/27/2021')).toBeInTheDocument());
      userEvent.click((screen.getAllByRole('checkbox')[1]));
      expect(screen.getByText(/1 selected/i)).toBeInTheDocument();
    });

    it('form header checkbox selects all reports', async () => {
      await waitFor(() => expect(screen.getByText('03/27/2021')).toBeInTheDocument());
      expect(screen.getAllByRole('checkbox')).toHaveLength(2);
      userEvent.click((screen.getAllByRole('checkbox')[0]));
      await waitFor(() => screen.getAllByRole('checkbox').forEach((val) => {
        expect(val).toBeChecked();
      }));
    });

    it('clicking send to command button displays modal', async () => {
      await waitFor(() => expect(screen.getByText('03/27/2021')).toBeInTheDocument());
      expect(screen.getAllByRole('checkbox')).toHaveLength(2);
      userEvent.click((screen.getAllByRole('checkbox')[1]));
      await waitFor(() => userEvent.click(screen.getByRole('button', { name: /send up to command/i })));
      await waitFor(() => expect(screen.getByTestId('send-to-command-modal-form')).toBeInTheDocument());
    });

    it('clicking cancel inside modal closes modal and modal can open again', async () => {
      await waitFor(() => expect(screen.getByText('03/27/2021')).toBeInTheDocument());
      expect(screen.getAllByRole('checkbox')).toHaveLength(2);
      userEvent.click((screen.getAllByRole('checkbox')[1]));
      await waitFor(() => userEvent.click(screen.getByRole('button', { name: /send up to command/i })));
      await waitFor(() => expect(screen.getByTestId('send-to-command-modal-form')).toBeInTheDocument());
      userEvent.click(screen.getByRole('button', { name: /cancel/i }));
      await waitFor(() => expect(screen.queryByTestId('send-to-command-modal-form')).not.toBeInTheDocument());
      await waitFor(() => userEvent.click(screen.getByRole('button', { name: /send up to command/i })));
      await waitFor(() => expect(screen.getByTestId('send-to-command-modal-form')).toBeInTheDocument());
    });

    it('should render button to view details of incident', async () => {
      expect(await screen.findByRole('button', { name: /view/i })).toBeInTheDocument();
    });

    it('should render incident detail view modal when view is clicked', async () => {
      expect(screen.queryByRole('heading', { name: 'Incident Report' })).not.toBeInTheDocument();
      userEvent.click(await screen.findByRole('button', { name: /view/i }));
      expect(await screen.findByRole('heading', { name: 'Incident Report' })).toBeInTheDocument();
    });

    it('clicking send inside modal does not work if command not selected', async () => {
      await waitFor(() => expect(screen.getByText('03/27/2021')).toBeInTheDocument());
      expect(screen.getAllByRole('checkbox')).toHaveLength(2);
      userEvent.click((screen.getAllByRole('checkbox')[1]));
      await waitFor(() => userEvent.click(screen.getByRole('button', { name: /send up to command/i })));
      await waitFor(() => expect(screen.getByTestId('send-to-command-modal-form')).toBeInTheDocument());
      userEvent.click(screen.getByRole('button', { name: /^send$/i }));
      await waitFor(() => expect(screen.getByTestId('send-to-command-modal-form')).toBeInTheDocument());
    });

    it('should close incident detail view modal when cancel button is clicked', async () => {
      userEvent.click(await screen.findByRole('button', { name: /view/i }));
      expect(await screen.findByRole('heading', { name: 'Incident Report' })).toBeInTheDocument();
      userEvent.click(await screen.getByRole('button', { name: 'CANCEL' }));
      expect(screen.queryByRole('heading', { name: 'Incident Report' })).toBeNull();
    });

    it('should close incident detail view modal when X is clicked', async () => {
      userEvent.click(await screen.findByRole('button', { name: /view/i }));
      expect(await screen.findByRole('heading', { name: 'Incident Report' })).toBeInTheDocument();
      userEvent.click(await screen.getByRole('button', { name: 'CANCEL' }));
      expect(screen.queryByRole('heading', { name: 'Incident Report' })).toBeNull();
    });

    it('sending report closes modal and deselects all SIRs', async () => {
      await waitFor(() => expect(screen.getByText('03/27/2021')).toBeInTheDocument());
      userEvent.click((screen.getAllByRole('checkbox')[1]));
      await waitFor(() => userEvent.click(screen.getByRole('button', { name: /send up to command/i })));
      expect(screen.getByTestId('send-to-command-modal-form')).toBeInTheDocument();
      userEvent.click(screen.getByText(/^select a command$/i));
      expect(screen.getByText(/battalion commander/i)).toBeInTheDocument();
      userEvent.click(screen.getByText(/battalion commander/i));
      userEvent.click(screen.getByRole('button', { name: /^send$/i }));
      await waitFor(() => expect(screen.queryByTestId('send-to-command-modal-form')).not.toBeInTheDocument());
      await waitFor(() => screen.getAllByRole('checkbox').forEach((val) => {
        expect(val).not.toBeChecked();
      }));
    });

    it('sending report displays "sent to [command] banner', async () => {
      await waitFor(() => expect(screen.getByText('03/27/2021')).toBeInTheDocument());
      userEvent.click((screen.getAllByRole('checkbox')[1]));
      await waitFor(() => userEvent.click(screen.getByRole('button', { name: /send up to command/i })));
      expect(screen.getByTestId('send-to-command-modal-form')).toBeInTheDocument();
      userEvent.click(screen.getByText(/^select a command$/i));
      expect(screen.getByText(/battalion commander/i)).toBeInTheDocument();
      userEvent.click(screen.getByText(/battalion commander/i));
      userEvent.click(screen.getByRole('button', { name: /^send$/i }));
      await waitFor(() => expect(screen.getByText(/sent to battalion commander/i)));
    });
  });

  describe('Detailed View Modal Submission', () => {
    // const { content, ...pageableData } = dataWithOne;
    const updatedDataWithOne = { ...dataWithOne };
    let receivedData: IncidentRowEntry[];
    let numOfCalls = 0;
    const server = setupServer(
      rest.get('/api/incidents', (req, res, ctx) => {
        if (numOfCalls === 0) {
          numOfCalls += 1;
          return res(ctx.json(dataWithOne));
        }
        return res(ctx.json(updatedDataWithOne));
      }),
      rest.get(
        '/api/incidents/1',
        (
          req,
          res,
          ctx,
        ) => res(ctx.json(testData)),
      ),
      rest.patch<IncidentRowEntry>('/api/incidents/1', (
        req,
        res,
        ctx,
      ) => {
        const {
          id, incidentDate, incidentLocation, harmOrPotentialHarm, eventType,
        } = req.body;
        receivedData = [{
          id, incidentDate, incidentLocation, harmOrPotentialHarm, eventType,
        }];
        updatedDataWithOne.content = receivedData;
        return res(ctx.json(dataWithOne));
      }),
    );
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    beforeEach(() => {
      render(<ResponderView />);
    });

    it('should update record when detail view modal is saved', async () => {
      expect(await screen.findByTestId('incident-date')).toHaveTextContent('03/27/2021');
      expect(screen.getByTestId('incident-location')).toHaveTextContent('Shouxihu');
      expect(screen.getByTestId('potential-harm')).toHaveTextContent('Yes');
      expect(screen.getByTestId('event-type')).toHaveTextContent('visa');

      userEvent.click(screen.getByRole('button', { name: /view/i }));
      userEvent.type(await screen.findByLabelText(/date of event/i), '1958-08-08');
      userEvent.type(screen.getByRole('textbox', { name: /incident location/i }), 'Test text');
      userEvent.selectOptions(screen.getByRole('combobox', { name: /event type/i }), 'Actual Event / Incident');
      userEvent.selectOptions(screen.getByRole('combobox', { name: /harm or potential harm/i }), 'No');
      userEvent.click(screen.getByRole('button', { name: /save/i }));

      await waitFor(() => expect(screen.getByTestId('incident-date')).toHaveTextContent('1958-08-08'));
      expect(screen.getByTestId('incident-location')).toHaveTextContent('Test text');
      // expect(screen.getByTestId('potential-harm')).toHaveTextContent('No');
      expect(screen.getByTestId('event-type')).toHaveTextContent('Actual Event / Incident');
    });
  });
});
