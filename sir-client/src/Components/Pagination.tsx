import React from 'react';
import Dropdown from 'react-dropdown';

type paginationProps = {
  size: number;
  firstPage: boolean;
  lastPage: boolean;
  totalCount: number;
  currentPage: number;
  offset: number;
  navigatePage: (page: number, size: number) => void;
};

const Pagination: React.FC<paginationProps> = ({
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
        value="10"
        placeholder="10"
      />
    </div>
    <span>
      {`${offset + 1}-${offset + size} of ${totalCount}`}
    </span>
    <div className="page-controls">
      <button
        type="button"
        disabled={firstPage}
        onClick={() => navigatePage(currentPage - 1, size)}
        data-testid="last-page-arrow"
      >
        <i className="gg-chevron-left" />
      </button>
      <button
        type="button"
        disabled={lastPage}
        onClick={() => navigatePage(currentPage + 1, size)}
        data-testid="next-page-arrow"
      >
        <i className="gg-chevron-right" />
      </button>
    </div>
  </div>
);

export default Pagination;
