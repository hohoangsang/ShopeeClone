import classNames from 'classnames';
import React from 'react';
import { Link, createSearchParams } from 'react-router-dom';
import { path } from 'src/constants/path';
import { QueryConfig } from 'src/pages/ProductList/ProductList';

interface Props {
  pageSize: number;
  queryConfig: QueryConfig;
}

const RANGE = 2;

export default function Pagination({ pageSize, queryConfig }: Props) {
  const page = Number(queryConfig.page);

  const renderPagination = () => {
    let dotsAfter = false;
    let dotsBefore = false;
    const renderDotsAfter = (index: number) => {
      if (!dotsAfter) {
        dotsAfter = true;

        return (
          <span
            key={index}
            className='flex items-center rounded-sm border border-gray-300 bg-white px-3 py-2 outline-none'
          >
            ...
          </span>
        );
      }
      return null;
    };

    const renderDotsBefore = (index: number) => {
      if (!dotsBefore) {
        dotsBefore = true;
        return (
          <span
            key={index}
            className='flex items-center rounded-sm border border-gray-300 bg-white px-3 py-2 outline-none'
          >
            ...
          </span>
        );
      }
      return null;
    };

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNum = index + 1;

        if (page <= RANGE * 2 + 1 && pageNum > page + RANGE && pageNum <= pageSize - RANGE) {
          return renderDotsAfter(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNum > RANGE && pageNum < page - RANGE) {
            return renderDotsBefore(index);
          } else if (pageNum > page + RANGE && pageNum <= pageSize - RANGE) {
            return renderDotsAfter(index);
          }
        } else if (page >= pageSize - RANGE * 2 && pageNum > RANGE && pageNum < page - RANGE) {
          return renderDotsBefore(index);
        }

        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNum.toString()
              }).toString()
            }}
            key={index}
            className={classNames('flex items-center rounded-sm border bg-white px-3 py-2 outline-none', {
              'border-orange/80': page === pageNum,
              'border-gray-300': page !== pageNum
            })}
          >
            {pageNum}
          </Link>
        );
      });
  };

  return (
    <div className='mt-6 flex flex-wrap items-center justify-center gap-2'>
      {page == 1 ? (
        <span className='flex cursor-not-allowed items-center rounded-sm border border-gray-300 bg-white/60 px-3 py-2 outline-none'>
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='flex items-center rounded-sm border border-gray-300 bg-white px-3 py-2 outline-none'
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page == pageSize ? (
        <span className='flex cursor-not-allowed items-center rounded-sm border border-gray-300 bg-white/60 px-3 py-2 outline-none'>
          Next
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='flex items-center rounded-sm border border-gray-300 bg-white px-3 py-2 outline-none'
        >
          Next
        </Link>
      )}
    </div>
  );
}
