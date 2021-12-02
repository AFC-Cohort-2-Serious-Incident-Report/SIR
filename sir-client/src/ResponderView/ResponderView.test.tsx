import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import ResponderView from './ResponderView';
import dataWithOne from '../Responder_Test_Data_1.json';

const server = setupServer(
  rest.get('/api/incidents', (req, res, ctx) => res(ctx.json(dataWithOne))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ResponderView', () => {
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

  it('should update record when detail view modal is saved', async () => {
    expect(await screen.findByTestId('incident-date')).toHaveTextContent('03/27/2021');
    expect(screen.getByTestId('incident-location')).toHaveTextContent('Shouxihu');
    expect(screen.getByTestId('potential-harm')).toHaveTextContent('Yes');
    expect(screen.getByTestId('event-type')).toHaveTextContent('visa');
    // TODO: the rest...
  });
});
