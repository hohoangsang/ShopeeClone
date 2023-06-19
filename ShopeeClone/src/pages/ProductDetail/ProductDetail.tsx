import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { productApi } from 'src/api/product.api';
import ProductRating from 'src/components/ProductRating';
import { formatNumberToSocialStyle } from 'src/utils/utils';

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
      <div className='container bg-white shadow'>
        <div className='grid grid-cols-12 gap-9'>
          <div className='col-span-5'>
            <div className='relative w-full pt-[100%] shadow'>
              <img
                src={product.image}
                alt={product.name}
                className='absolute left-0 top-0 h-full w-full bg-white object-cover'
              />
            </div>

            <div className='relative mt-4 grid w-full grid-cols-5 gap-5'>
              <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-gray-200/60 font-semibold text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='{1.5}'
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </button>

              {product.images.slice(0, 5).map((image, index) => {
                const isActive = index === 0;

                return (
                  <div className='relative w-full cursor-pointer pt-[100%]' key={image}>
                    <img src={image} alt={image} className='absolute left-0 top-0 w-full object-contain' />
                    {isActive && (
                      <div className='absolute left-0 top-0 h-full w-full border border-orange bg-transparent' />
                    )}
                  </div>
                );
              })}

              <button className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-gray-200/60 font-semibold text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='{1.5}'
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            </div>
          </div>

          <div className='col-span-7'>
            <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
            <div className='my-4 flex items-center'>
              <div className='flex items-center gap-1'>
                <span className='mt-1 text-orange underline'>{product.rating}</span>
                <ProductRating
                  rating={product.rating}
                  classNameStartFilled='h-4 w-4 fill-red-500 text-red-500'
                  classNameNonStartFilled='h-4 w-4 fill-current text-gray-300'
                />
              </div>

              <div className='mx-4 h-6 w-[1px] bg-gray-300' />

              <div>
                <span>{formatNumberToSocialStyle(product.sold)}</span>
                <span className='ml-1 text-sm capitalize text-gray-500'>Đã bán</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
