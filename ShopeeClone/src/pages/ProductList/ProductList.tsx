import React from 'react';
import AsideFilter from './AsideFilter';
import SortProduct from './SortProduct';
import Product from './Product';

export default function ProductList() {
  return (
    <div className='bg-gray-200 py-3'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>

          <div className='col-span-9'>
            <SortProduct />
            <div className='mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {Array(30)
                .fill(0)
                .map((_, index) => (
                  <Product key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
