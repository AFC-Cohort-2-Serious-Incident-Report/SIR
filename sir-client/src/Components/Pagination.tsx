import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import { set } from 'msw/lib/types/context';

// eslint-disable-next-line @typescript-eslint/ban-types
type paginationProps = {
  pages: number;
  size: number;
  firstPage: boolean;
  lastPage: boolean;
  totalCount: number;
  currentPage: number;
  offset: number;
  navigatePage: (page: number, size: number) => void;
};

const Pagination: React.FC<paginationProps> = ({
  pages,
  size,
  firstPage,
  lastPage,
  totalCount,
  currentPage,
  offset,
  navigatePage,
}: paginationProps) => (
  <div
    className="pagination"
    data-testid="pagination"
  >
    <div className="size-container">
      Rows per page:
      <Dropdown
        options={[
          '5', '10', '15',
        ]}
        onChange={(val) => navigatePage(0, parseInt(val.value, 10))}
        value="5"
        placeholder="5"
      />
    </div>
    <span>
      {`${offset + 1}-${offset + size} of ${totalCount}`}
    </span>
    <div className="page-controls">
      <button type="button" disabled={firstPage} onClick={() => navigatePage(currentPage - 1, size)}>
        <i className="gg-chevron-left" />
      </button>
      <button type="button" disabled={lastPage} onClick={() => navigatePage(currentPage + 1, size)}>
        <i className="gg-chevron-right" />
      </button>
    </div>
  </div>
);

export default Pagination;

/*
 Rows per page: 5 \/
 1-5 of 13 <----
 < >
*/
