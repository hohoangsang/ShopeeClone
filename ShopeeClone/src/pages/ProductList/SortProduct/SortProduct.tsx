import React from 'react';

export default function SortProduct() {
  return (
    <div className='flex flex-wrap items-center justify-between bg-gray-200 px-6 py-3 text-sm'>
      <div className='flex items-center gap-3'>
        <span className='text-black/70'>Sắp xếp theo</span>
        <button className='rounded-sm bg-orange px-3 py-2 capitalize text-white shadow-sm outline-none'>
          phổ biến
        </button>
        <button className='rounded-sm bg-white px-3 py-2 capitalize shadow-sm outline-none'>Mới nhất</button>
        <button className='rounded-sm bg-white px-3 py-2 capitalize shadow-sm outline-none'>Bán chạy</button>

        <select defaultValue={''} className='h-9 rounded-sm border-none bg-white px-2 outline-none'>
          <option value='' disabled>
            Giá
          </option>

          <option value='price:asc'>Giá: Thấp đến Cao</option>
          <option value='price:desc'>Giá: Cao đến Thấp</option>
        </select>
      </div>
      <div className='flex items-center gap-4'>
        <div>
          <span className='text-orange'>2</span>
          <span>/9</span>
        </div>
        <div>
          <button className='mr-1 cursor-not-allowed bg-white/50 p-3' disabled>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3 w-3'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
          </button>
          <button className='bg-white p-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3 w-3'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
