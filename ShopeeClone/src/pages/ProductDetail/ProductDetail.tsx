import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productApi } from 'src/api/product.api';
import InputNumber from 'src/components/Form/InputNumber';
import ProductRating from 'src/components/ProductRating';
import { Product } from 'src/types/product.type';
import { formatCurrency, formatNumberToSocialStyle, saleRate } from 'src/utils/utils';

export default function ProductDetail() {
  const { id } = useParams();

  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return productApi.getProduct(id as string);
    }
  });

  const product = productDetailData?.data.data;

  const [currentImagesIndex, setCurrentImageIndex] = useState([0, 5]);

  const [imageActived, setImageActived] = useState('');

  const currentImagesList = useMemo(() => {
    return (product as Product)?.images.slice(...currentImagesIndex);
  }, [product, currentImagesIndex]);

  useEffect(() => {
    if (product && product.images.length) {
      setImageActived(product.images[0]);
    }
  }, [product]);

  const activeImage = (img: string) => {
    setImageActived(img);
  };

  const prevSlice = () => {
    if (currentImagesIndex[0] <= 0) return;

    setCurrentImageIndex((prev) => [prev[0] - 1, prev[1] - 1]);
  };

  const nextSlice = () => {
    if (currentImagesIndex[1] >= (product as Product)?.images.length) return;

    setCurrentImageIndex((prev) => [prev[0] + 1, prev[1] + 1]);
  };

  if (!product) return null;

  return (
    <div className='bg-gray-100 py-3'>
      <div className='container bg-white shadow'>
        <div className='grid grid-cols-12 gap-9'>
          <div className='col-span-5'>
            <div className='relative w-full pt-[100%] shadow'>
              <img
                src={imageActived}
                alt={product.name}
                className='absolute left-0 top-0 h-full w-full bg-white object-cover'
              />
            </div>

            <div className='relative mt-4 grid w-full grid-cols-5 gap-5'>
              <button
                onClick={prevSlice}
                className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-gray-200/60 font-semibold text-white'
              >
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

              {currentImagesList.map((image) => {
                const isActive = image === imageActived;

                return (
                  <div
                    className='relative w-full cursor-pointer pt-[100%]'
                    key={image}
                    onMouseEnter={() => activeImage(image)}
                  >
                    <img src={image} alt={image} className='absolute left-0 top-0 w-full object-contain' />
                    {isActive && (
                      <div className='absolute left-0 top-0 h-full w-full border border-orange bg-transparent' />
                    )}
                  </div>
                );
              })}

              <button
                onClick={nextSlice}
                className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-gray-200/60 font-semibold text-white'
              >
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
                  classNameStartFilled='h-4 w-4 fill-orange text-orange'
                  classNameNonStartFilled='h-4 w-4 fill-current text-gray-300'
                />
              </div>

              <div className='mx-4 h-6 w-[1px] bg-gray-300' />

              <div>
                <span>{formatNumberToSocialStyle(product.sold)}</span>
                <span className='ml-1 text-sm capitalize text-gray-500'>Đã bán</span>
              </div>
            </div>

            <div className='flex items-center bg-gray-100 px-6 py-4'>
              <span className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</span>

              <div className='ml-3 text-3xl text-orange'>₫{formatCurrency(product.price)}</div>

              <div className='ml-5 rounded-sm bg-orange px-1 text-sm font-semibold uppercase text-white'>
                <span>{saleRate(product.price_before_discount, product.price)} </span>
                giảm
              </div>
            </div>

            <div className='mt-6 flex items-center'>
              <span className='capitalize text-gray-500'>số lượng</span>

              <form className='ml-10 flex items-center'>
                <button className='border-1 h-8 border border-r-0 px-2 text-xl text-gray-500 outline-none'>-</button>
                <InputNumber
                  classNameError='hidden'
                  classNameInput='border-1 text w-[4rem] border px-2 h-8 text-center'
                />
                <button className='border-1 h-8 border border-l-0 px-2 text-xl text-gray-500 outline-none'>+</button>
              </form>

              <span className='ml-5 text-gray-500'>{product.quantity} sản phẩm có sẵn</span>
            </div>

            <div className='mt-6 flex items-center gap-4'>
              <button className='flex-items-center flex gap-2 rounded-sm border border-orange bg-orange/10 px-5 py-3 capitalize text-orange hover:bg-orange/20'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='{1.5}'
                  stroke='currentColor'
                  className='h-5 w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
                Thêm vào giỏ hàng
              </button>

              <button className='rounded-sm bg-orange px-5 py-3 capitalize text-white hover:bg-orange/80'>
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='container mt-4 bg-white'>
        <div className='bg-gray-100/40 p-3 text-lg uppercase'>Chi tiết sản phẩm</div>

        <div className='p-3 text-sm leading-loose'>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description as string) }} />
        </div>
      </div>
    </div>
  );
}
