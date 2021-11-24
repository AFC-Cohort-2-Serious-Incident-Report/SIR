import { render, screen } from '@testing-library/react';
import ResponderView from './ResponderView';

describe('ResponderView', () => {
  beforeEach(() => {
    render(<ResponderView />);
  });

  it('should render components correctly', () => {
    expect(screen.getByRole('heading', { name: /incident reports/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /reports/i })).toBeInTheDocument();
  });
});
