import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { userApi } from 'src/api/profile.api';
import Button from 'src/components/Button';
import Input from 'src/components/Form/Input';
import InputNumber from 'src/components/Form/InputNumber';
import { UserSchema, userSchema } from 'src/utils/rules';

const userFormSchema = userSchema.pick(['address', 'avatar', 'date_of_birth', 'name', 'phone']);

type UserFormSchema = Pick<UserSchema, 'address' | 'avatar' | 'name' | 'phone' | 'date_of_birth'>;

export default function Profile() {
  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  });

  const profile = profileData?.data.data;
  console.log(profile);

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    control,
    setValue
  } = useForm<UserFormSchema>({
    defaultValues: {
      address: '',
      avatar: '',
      name: '',
      phone: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(userFormSchema)
  });

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name);
      setValue('phone', profile.phone);
      setValue('address', profile.address);
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1));
      setValue('avatar', profile.avatar);
    }
  }, [profile, setValue]);

  return (
    <div className='bg-white px-6 pb-16 pt-4 text-sm shadow-sm'>
      <div>
        <h1 className='text-lg uppercase'>Hồ sơ của tôi </h1>
        <p className='text-gray-600'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>

      <div className='my-4 h-[1px] w-full bg-gray-200' />

      <form className='mt-6 flex flex-col-reverse flex-wrap lg:flex-row'>
        <div className='flex-grow pt-4 sm:pt-8 md:pr-14'>
          <div className='col-span-12 md:col-span-8'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='text-gray-500 sm:w-[20%] sm:text-right '>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>{profile?.email}</div>
            </div>
            <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate capitalize text-gray-500 sm:mt-3 sm:w-[20%] sm:text-right'>Tên</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm outline-none focus:border-gray-500'
                  name='name'
                  placeholder='Tên'
                  errorMessage={errors.name?.message}
                  register={register}
                />
              </div>
            </div>
            <div className='flex flex-col flex-wrap sm:mt-2 sm:flex-row'>
              <div className='truncate capitalize text-gray-500 sm:mt-3 sm:w-[20%] sm:text-right'>Số điện thoại</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => {
                    return (
                      <InputNumber
                        placeholder='Số điện thoại'
                        classNameInput='w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm outline-none focus:border-gray-500'
                        errorMessage={errors.phone?.message}
                        {...field}
                        onChange={() => {
                          field.onChange;
                        }}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className='flex flex-col flex-wrap sm:mt-2 sm:flex-row'>
              <div className='truncate capitalize text-gray-500 sm:mt-3 sm:w-[20%] sm:text-right'>Địa chỉ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm outline-none focus:border-gray-500'
                  name='address'
                  placeholder='Địa chỉ'
                  errorMessage={errors.address?.message}
                  register={register}
                />
              </div>
            </div>
            <div className='flex flex-col flex-wrap sm:mt-2 sm:flex-row'>
              <div className='truncate capitalize text-gray-500 sm:mt-3 sm:w-[20%] sm:text-right'>Ngày sinh</div>
              <div className='flex sm:w-[80%]  sm:pl-5'>
                <div className='flex justify-between gap-4'>
                  <select className='h-[40px] w-[32%] rounded-sm border px-3'>
                    <option value=''>Ngày</option>
                  </select>
                  <select className='h-[40px] w-[32%] rounded-sm border px-3'>
                    <option value=''>Tháng</option>
                  </select>
                  <select className='h-[40px] w-[32%] rounded-sm border px-3'>
                    <option value=''>Năm</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='flex flex-col flex-wrap sm:mt-5 sm:flex-row'>
              <div className='truncate capitalize text-gray-500 sm:mt-3 sm:w-[20%] sm:text-right' />
              <div className='flex sm:w-[80%] sm:pl-5'>
                <Button className='rounded-sm bg-orange px-6 py-3 text-white hover:bg-orange/80'>Lưu</Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className='m flex w-[180px] flex-col justify-center border-b border-b-gray-200 pb-4 md:border-b-0 md:border-l md:border-l-gray-200 lg:w-72'>
            <div className='m-auto my-3 h-[100px] w-[100px] md:mb-6 md:mt-8'>
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
      </form>
    </div>
  );
}
