import { useState } from 'react';

import SortProduct from './components/SortProduct';
import Product from './components/Product';
import { useQuery } from '@tanstack/react-query';
import { productApi } from 'src/api/product.api';
import { useQueryParams } from 'src/hooks/useQueryParams';
import Pagination from 'src/components/Pagination';
import { ProductListConfig } from 'src/types/product.type';
import { omitBy, isUndefined } from 'lodash';
import { categoryApi } from 'src/api/category.api';
import AsideFilter from './components/AsideFilter';
import useQueryConfig from 'src/hooks/useQueryConfig';

export default function ProductList() {
  const queryConfig = useQueryConfig();

  const { data: productsData } = useQuery({
    queryKey: ['productList', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig);
    },
    keepPreviousData: true
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getAll();
    }
  });

  return (
    <div className='bg-gray-100 py-3'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-2'>
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
            </div>

            <div className='col-span-10'>
              <SortProduct pageSize={productsData.data.data.pagination.page_size} queryConfig={queryConfig} />
              <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
