import React from 'react';
import AsideFilter from './AsideFilter';
import SortProduct from './SortProduct';
import Product from './Product';
import { useQuery } from '@tanstack/react-query';
import { productApi } from 'src/api/product.api';
import { useQueryParams } from 'src/hooks/useQueryParams';

export default function ProductList() {
  const queryParams = useQueryParams();

  const { data } = useQuery({
    queryKey: ['productList', queryParams],
    queryFn: () => {
      return productApi.getProductList(queryParams);
    }
  });

  console.log(data);

  return (
    <div className='bg-gray-100 py-3'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-2'>
            <AsideFilter />
          </div>

          <div className='col-span-10'>
            <SortProduct />
            <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {data && data.data.data.products.map((product) => <Product key={product._id} product={product} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
