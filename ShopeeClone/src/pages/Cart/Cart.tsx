import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { purchasesApi } from 'src/api/purchases.api';
import Button from 'src/components/Button';
import QuantityController from 'src/components/QuantityController';
import { path } from 'src/constants/path';
import { purchasesStatus } from 'src/constants/purchases';
import { ProductCart, Purchases } from 'src/types/purchases.type';
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils';
import { produce } from 'immer';

interface ExtendsPurchases extends Purchases {
  checked: boolean;
  disabled: boolean;
}

export default function Cart() {
  const [extendsPurchases, setExtendsPurchases] = useState<ExtendsPurchases[]>([]);

  const status = purchasesStatus.inCart;

  const { data: purchasesData, refetch } = useQuery({
    queryKey: ['purchasesCart', { status }],
    queryFn: () => purchasesApi.getPurchases({ status })
  });

  const updatePurchaseMutation = useMutation({
    mutationFn: (body: ProductCart) => {
      return purchasesApi.updatePurchases(body);
    },
    onSuccess: () => {
      refetch();
    }
  });

  const productInCartData = purchasesData?.data.data;

  const isCheckAllPurchase = extendsPurchases.every((purchase) => purchase.checked);

  useEffect(() => {
    setExtendsPurchases(
      productInCartData?.map((purchase) => ({
        ...purchase,
        checked: false,
        disabled: false
      })) || []
    );
  }, [productInCartData]);

  const toggleCheckAllPurchase = () => {
    setExtendsPurchases(
      produce((draft) => {
        return draft.map((purchase) => ({
          ...purchase,
          checked: !isCheckAllPurchase
        }));
      })
    );
  };

  const checkPurchase = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendsPurchases(
      produce((draft) => {
        const purchaseFinded = draft[index];
        purchaseFinded.checked = event.target.checked;
      })
    );
  };

  const handleQuantity = (productIndex: number, value: number, enable: boolean) => {
    if (!enable) return;

    setExtendsPurchases(
      produce((draft) => {
        const purchaseFinded = draft[productIndex];
        purchaseFinded.disabled = true;
      })
    );

    updatePurchaseMutation.mutate({
      buy_count: value,
      product_id: extendsPurchases[productIndex].product._id
    });
  };

  return (
    <div className='bg-neutral-100'>
      <div className='container'>
        <div className='overflow-auto text-sm'>
          <div className='min-w-[1200px]'>
            <div className='grid grid-cols-12 bg-white px-12 py-5 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <input
                    checked={isCheckAllPurchase}
                    onChange={toggleCheckAllPurchase}
                    type='checkbox'
                    className='h-5 w-5 rounded border accent-orange outline-none'
                  />
                  <div className='ml-4 capitalize'>sản phẩm</div>
                </div>
              </div>

              <div className='col-span-6'>
                <div className='grid grid-cols-5 items-center text-gray-500'>
                  <div className='col-span-2 text-center capitalize'>Đơn giá</div>
                  <div className='col-span-1 text-center capitalize'>số lượng</div>
                  <div className='col-span-1 text-center capitalize'>số tiền</div>
                  <div className='col-span-1 text-center capitalize'>thao tác</div>
                </div>
              </div>
            </div>

            {extendsPurchases?.map((purchase, index) => (
              <div
                className='mt-4 grid grid-cols-12 items-center bg-white px-12 py-5 shadow last:mb-4'
                key={purchase._id}
              >
                <div className='col-span-6'>
                  <div className='flex items-center'>
                    <div>
                      <input
                        checked={purchase.checked}
                        onChange={checkPurchase(index)}
                        type='checkbox'
                        className='h-5 w-5 rounded border accent-orange outline-none'
                      />
                    </div>
                    <div className='ml-4 flex-grow'>
                      <div className='flex'>
                        <Link
                          to={`${path.home}${generateNameId({
                            name: purchase.product.name,
                            id: purchase.product._id
                          })}`}
                          className='h-20 w-20 flex-shrink-0'
                        >
                          <img src={purchase.product.image} alt={purchase.product.name} />
                        </Link>
                        <Link
                          to={`${path.home}${generateNameId({
                            name: purchase.product.name,
                            id: purchase.product._id
                          })}`}
                          className='ml-4 line-clamp-2 flex-grow'
                        >
                          {purchase.product.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-span-6'>
                  <div className='grid grid-cols-5'>
                    <div className='col-span-2 flex items-center justify-center'>
                      <div className='flex items-center gap-2'>
                        <div className='max-w-[50%] truncate text-gray-500 line-through'>
                          <span>₫</span>
                          <span className='text-sm text-gray-500'>
                            {formatCurrency(purchase.product.price_before_discount)}
                          </span>
                        </div>

                        <div>
                          <span>₫</span>
                          <span className='text-sm'>{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-1'>
                      <QuantityController
                        max={purchase.product.quantity}
                        value={purchase.buy_count}
                        classNameWrapper='m-0'
                        onDecrease={(value) => handleQuantity(index, value, value > 1)}
                        onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                        disabled={purchase.disabled}
                      />
                    </div>
                    <div className='col-span-1 flex items-center justify-center text-orange'>
                      <span>₫</span>
                      <span className='text-sm'>{formatCurrency(purchase.product.price * purchase.buy_count)}</span>
                    </div>
                    <div className='col-span-1 flex items-center justify-center'>
                      <Button
                        className='border-none bg-transparent text-black outline-none hover:text-orange'
                        text='Xóa'
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='sticky bottom-0 left-0 z-10 mt-4 bg-white shadow-lg'>
          <div className='grid grid-cols-12 items-center gap-5 px-8 py-5'>
            <div className='col-span-12 xl:col-span-6'>
              <div className='flex items-center'>
                <div>
                  <input
                    checked={isCheckAllPurchase}
                    onChange={toggleCheckAllPurchase}
                    type='checkbox'
                    className='h-5 w-5 rounded border accent-orange outline-none'
                  />
                </div>
                <div className='ml-6 flex gap-8'>
                  <Button
                    onClick={toggleCheckAllPurchase}
                    className='border-none bg-transparent text-gray-700 outline-none'
                    text={`Chọn tất cả (${extendsPurchases.length})`}
                  />
                  <Button className='border-none bg-transparent text-gray-700 outline-none' text='Xóa' />
                </div>
              </div>
            </div>

            <div className='col-span-12 xl:col-span-6'>
              <div className='flex items-center justify-between gap-6 sm:gap-2 xl:justify-end'>
                <div>
                  <div className='flex items-center gap-1'>
                    <p className='text-[12px] sm:text-[16px]'>
                      Tổng thanh toán ({extendsPurchases.filter((purchase) => purchase.checked).length}):{' '}
                    </p>
                    <span className='text-lg text-orange md:text-2xl'>₫{formatCurrency(3020000)}</span>
                  </div>
                  <div className='grid grid-cols-12 items-center'>
                    <span className='col-span-8 text-right text-[12px] sm:text-[16px] lg:col-span-10'>Tiết kiệm</span>
                    <span className='col-span-4 text-right text-orange lg:col-span-2'>
                      ₫{formatNumberToSocialStyle(20000)}
                    </span>
                  </div>
                </div>

                <Button
                  text='Mua hàng'
                  className='flex h-11 w-[100px] items-center justify-center rounded-sm bg-orange text-[12px] capitalize text-white sm:w-[150px] sm:text-[16px] md:w-[200px]'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
