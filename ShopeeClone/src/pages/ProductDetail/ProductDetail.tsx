import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productApi } from 'src/api/product.api';

export default function ProductDetail() {
  const { id } = useParams();

  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return productApi.getProduct(id as string);
    }
  });

  const product = productDetailData?.data.data;

  if (!product) return null;

  return (
    <div className='bg-gray-100 py-3'>
      <div className='container bg-white'>
        <div className='grid grid-cols-12 gap-9'>
          <div className='col-span-5'>
            <div className='relative w-full pt-[100%]'>
              <img
                src={product.image}
                alt={product.name}
                className='absolute left-0 top-0 h-full w-full bg-white object-cover'
              />
            </div>

            <div className='relative w-full'>
              <div className='absolute left-0 top-1/2 bg-gray-300 px-1 py-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='{1.5}'
                  stroke='currentColor'
                  className='h-6 w-6 font-semibold text-white'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </div>
              <div className='absolute right-0 top-1/2 bg-gray-300 px-1 py-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='{1.5}'
                  stroke='currentColor'
                  className='h-6 w-6 font-semibold text-white'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </div>

              <div className='flex items-center justify-between gap-4'>
                {product.images.slice(0, 5).map((image, index) => (
                  <div className='relative w-full pt-[100%]' key={index}>
                    <img src={image} alt={image} className='absolute left-0 top-0 h-full w-full' />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='col-span-7'></div>
        </div>
      </div>
    </div>
  );
}
