import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import ResponderView from './ResponderView';
import dataWithOne from '../Responder_Test_Data_1.json';
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
    );

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    beforeEach(() => {
      render(<ResponderView />);
    });

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
    it('send up to command bar should render when reports checked', async () => {
      // TODO: what is this? Why was it pushed? Lol - JP
      // screen.getAllByRole('checkbox').forEach((val) => {
      //   userEvent.click(val);
      // });
      //
      // screen.getAllByRole('checkbox')[1].click();
    });

    it('should render button to view details of incident', async () => {
      expect(await screen.findByRole('button', { name: /view/i })).toBeInTheDocument();
    });

    it('should render incident detail view modal when view is clicked', async () => {
      expect(screen.queryByRole('heading', { name: 'Incident Report' })).toBeNull();
      userEvent.click(await screen.findByRole('button', { name: /view/i }));
      expect(screen.getByRole('heading', { name: 'Incident Report' })).toBeInTheDocument();
    });

    // await waitFor(() => screen.getAllByRole('checkbox').forEach((val) => {
    //   expect(val).not.toBeChecked();

    it('should close incident detail view modal when cancel button is clicked', async () => {
      userEvent.click(await screen.findByRole('button', { name: /view/i }));
      expect(screen.getByRole('heading', { name: 'Incident Report' })).toBeInTheDocument();
      userEvent.click(await screen.getByRole('button', { name: 'CANCEL' }));
      expect(screen.queryByRole('heading', { name: 'Incident Report' })).toBeNull();
    });

    it('should close incident detail view modal when X is clicked', async () => {
      userEvent.click(await screen.findByRole('button', { name: /view/i }));
      expect(screen.getByRole('heading', { name: 'Incident Report' })).toBeInTheDocument();
      userEvent.click(await screen.getByTestId('modal-close-button'));
      expect(screen.queryByRole('heading', { name: 'Incident Report' })).toBeNull();
    });
  });

  describe('Detailed View Modal Submission', () => {
    let receivedData: IncidentRowEntry[];
    let numOfCalls = 0;
    const server = setupServer(
      rest.get('/api/incidents', (req, res, ctx) => {
        if (numOfCalls === 0) {
          numOfCalls += 1;
          return res(ctx.json(dataWithOne));
        }
        return res(ctx.json(receivedData));
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
        receivedData = [req.body];
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

      await waitFor(() => expect(screen.getByTestId('incident-date')).toHaveTextContent('08/08/1958'));
      expect(screen.getByTestId('incident-location')).toHaveTextContent('Test text');
      expect(screen.getByTestId('potential-harm')).toHaveTextContent('No');
      expect(screen.getByTestId('event-type')).toHaveTextContent('Actual Event / Incident');
    });
  });
});
