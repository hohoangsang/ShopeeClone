import React from 'react';
import Input from 'src/components/Form/Input';

export default function Profile() {
  return (
    <div className='bg-white px-6 py-4 text-sm shadow-sm'>
      <div>
        <h1 className='text-lg uppercase'>Hồ sơ của tôi </h1>
        <p className='text-gray-600'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>

      <div className='my-4 h-[1px] w-full bg-gray-200' />

      <div className='mt-6 grid grid-cols-12 gap-14'>
        <div className='col-span-12 md:col-span-8'>
          {/* <form className='col-span-12 md:col-span-8'>
            <div className='flex flex-wrap'>
              <div className='w-[20%] text-right text-gray-500 '>Email</div>
              <div className='w-[80%] pl-5'>vo***********@gmail.com</div>
            </div>
            <div className='mt-6 flex flex-wrap'>
              <div className='mt-3 w-[20%] truncate text-right capitalize text-gray-500'>Tên</div>
              <div className='w-[80%] pl-5'>
                <Input classNameInput='w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm outline-none focus:border-gray-500' />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap'>
              <div className='mt-3 w-[20%] truncate text-right capitalize text-gray-500'>Số điện thoại</div>
              <div className='w-[80%] pl-5'>
                <Input classNameInput='w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm outline-none focus:border-gray-500' />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap'>
              <div className='mt-3 w-[20%] truncate text-right capitalize text-gray-500'>Địa chỉ</div>
              <div className='w-[80%] pl-5'>
                <Input classNameInput='w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm outline-none focus:border-gray-500' />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap'>
              <div className='mt-3 w-[20%] truncate text-right capitalize text-gray-500'>Ngày sinh</div>
              <div className='flex w-[80%]  pl-5'>
                <div className='flex justify-between gap-4'>
                  <select className='h-[40px] w-[30%] rounded-sm border px-3'>
                    <option value=''>Ngày</option>
                  </select>
                  <select className='h-[40px] w-[30%] rounded-sm border px-3'>
                    <option value=''>Tháng</option>
                  </select>
                  <select className='h-[40px] w-[30%] rounded-sm border px-3'>
                    <option value=''>Năm</option>
                  </select>
                </div>
              </div>
            </div>
          </form> */}
          123
        </div>

        <div className='order-first col-span-12 md:order-last md:col-span-4'>
          <div className='w-full border-b border-b-gray-200 pb-4 md:border-b-0 md:border-l md:border-l-gray-200'>
            <div className='m-auto flex w-[180px] flex-col justify-center'>
              <div className='m-auto my-6 h-[100px] w-[100px]'>
                <img
                  src='https://down-vn.img.susercontent.com/file/3d254d6c41915f8b4541a296fb3a7405_tn'
                  alt='avatar'
                  className='h-full w-full rounded-full object-cover'
                />
              </div>

              <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />

              <button className='mx-auto mb-3 w-[100px] rounded-sm border border-gray-200 bg-white py-2 text-center capitalize'>
                Chọn ảnh
              </button>

              <span className='text-center text-gray-500'>Dụng lượng file tối đa 1 MB </span>
              <span className='text-center text-gray-500'>Định dạng:.JPEG, .PNG</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
