import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

type PageData = {
  pages: number;
  size: number;
  firstPage: boolean;
  lastPage: boolean;
  totalCount: number;
  currentPage: number;
  offset: number;
}

const testPageData: PageData = {
  pages: 3,
  size: 5,
  firstPage: true,
  lastPage: false,
  totalCount: 11,
  currentPage: 0,
  offset: 0,
};

test('Pagination renders visually', async () => {
  render(<Pagination
    pages={testPageData.pages}
    size={testPageData.size}
    firstPage={testPageData.firstPage}
    lastPage={testPageData.lastPage}
    totalCount={testPageData.totalCount}
    currentPage={testPageData.currentPage}
    offset={testPageData.offset}
    navigatePage={() => undefined}
  />);
  expect(screen.getByTestId('pagination')).toBeInTheDocument();
});
