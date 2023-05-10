import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className='flex items-center bg-orange bg-contain lg:h-auth__hero lg:min-h-auth_hero lg:bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7qvcy-lfuqe4hftedq21")] lg:bg-center lg:bg-no-repeat lg:py-10'>
      <div className='container mx-auto grid max-w-7xl grid-cols-1 p-4 lg:grid-cols-5'>
        <form className=' bg-white p-6 shadow-sm lg:col-span-2 lg:col-start-4'>
          <div className='form__title text-xl lg:text-2xl'>Đăng nhập</div>
          <div>
            <input
              type='text'
              name='email'
              className='mt-3 w-full rounded-sm border border-gray-300 p-3 shadow-sm outline-none focus:border-gray-500'
              placeholder='Email'
            />

            <div className='mt-1 min-h-[1rem] text-red-500'></div>
          </div>

          <div>
            <input
              type='password'
              name='password'
              className='mt-3 w-full rounded-sm border border-gray-300 p-3 shadow-sm outline-none focus:border-gray-500'
              placeholder='Password'
            />

            <div className='mt-1 min-h-[1rem] text-red-500'></div>
          </div>

          <button className='mt-5 w-full rounded-sm bg-orange px-2 py-4 text-white'>Đăng nhập</button>

          <div className='mt-8 flex justify-center'>
            <span className='mr-1 text-gray-400'>Bạn chưa có tài khoản?</span>
            <Link to='/register' className='text-orange'>
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
