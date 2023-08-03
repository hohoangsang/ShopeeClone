import React from 'react';
import { Link } from 'react-router-dom';
import { path } from 'src/constants/path';

export default function SideNav() {
  return (
    <div className='py-4 text-sm'>
      <div className='flex items-center text-sm'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0'>
          <img
            src='https://down-vn.img.susercontent.com/file/3d254d6c41915f8b4541a296fb3a7405_tn'
            alt='avatar'
            className='h-full w-full rounded-full object-cover'
          />
        </Link>

        <div className='ml-4 flex-grow overflow-hidden'>
          <span className='truncate font-semibold text-gray-700'>hohoangsang93</span>
          <Link to={path.profile} className='mt-[1px] flex items-center gap-2 capitalize text-gray-400'>
            <svg width={12} height={12} viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            <span className='truncate'>Sửa hồ sơ</span>
          </Link>
        </div>
      </div>

      <div className='my-4 h-[1px] w-full bg-gray-200' />

      <div className='mt-6 flex flex-col gap-4'>
        <Link to={path.profile} className='flex items-center gap-4 capitalize text-orange'>
          <div className='h-[22px] w-[22px] flex-shrink-0'>
            <img
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              alt='profile'
              className='h-full w-full'
            />
          </div>
          <span>Tài khoản của tôi</span>
        </Link>
        <Link to={path.password} className='flex items-center gap-4 capitalize text-gray-700'>
          <div className='h-[22px] w-[22px] flex-shrink-0'>
            <img
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              alt='profile'
              className='h-full w-full'
            />
          </div>
          <span>Đổi mật khẩu</span>
        </Link>
        <Link to={path.purchaseHistory} className='flex items-center gap-4 capitalize text-gray-700'>
          <div className='h-[22px] w-[22px] flex-shrink-0'>
            <img
              src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
              alt='profile'
              className='h-full w-full'
            />
          </div>
          <span>Đơn mua</span>
        </Link>
      </div>
    </div>
  );
}
