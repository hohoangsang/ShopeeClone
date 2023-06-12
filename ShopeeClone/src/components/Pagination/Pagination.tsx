import classNames from 'classnames';
import React from 'react';

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
}

export default function Pagination({ page, pageSize, setPage }: Props) {
  const renderPagination = () => {
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNum = index + 1;
        return (
          <button
            key={index}
            onClick={() => setPage(pageNum)}
            className={classNames('flex items-center rounded-sm border bg-white px-3 py-2 outline-none', {
              'border-orange/80': page === pageNum,
              'border-gray-300': page !== pageNum
            })}
          >
            {pageNum}
          </button>
        );
      });
  };

  return (
    <div className='mt-6 flex flex-wrap items-center justify-center gap-2'>
      <button className='flex items-center rounded-sm border border-gray-300 bg-white px-3 py-2 outline-none'>
        Next
      </button>
      {renderPagination()}
      <button className='flex items-center rounded-sm border border-gray-300 bg-white px-3 py-2 outline-none'>
        prev
      </button>
    </div>
  );
}
