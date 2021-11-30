import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
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
});
