import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Input from 'src/components/Form/Input';
import { RegisterSchema, registerSchema } from 'src/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { registerAccount } from 'src/api/auth.api';
import { omit } from 'lodash';
import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils';
import { ResponseType } from 'src/types/utils.type';

export default function Register() {
  const {
    handleSubmit,
    register,
    setError,
    watch, //method này dùng để lấy dữ liệu trong ô input nhưng làm cho component re-render trong suốt quá trình change input
    getValues, //method này dùng để lấy dữ liệu trong ô input và ko làm cho component re-render
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: yupResolver(registerSchema)
  });

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<RegisterSchema, 'confirm_password'>) => {
      return registerAccount(body);
    }
  });

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password']);
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        if (isAxiosErrorUnprocessableEntity<ResponseType<Omit<RegisterSchema, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data;

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(
                key as keyof Omit<RegisterSchema, 'confirm_password'>,
                {
                  message: formError[key as keyof Omit<RegisterSchema, 'confirm_password'>],
                  type: 'Server'
                },
                {
                  shouldFocus: true
                }
              );
            });
          }
        }
      }
    });
  });

  return (
    <div className='flex items-center bg-orange bg-contain lg:h-auth__hero lg:min-h-auth_hero lg:bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7qvcy-lfuqe4hftedq21")] lg:bg-center lg:bg-no-repeat lg:py-10'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='bg-white p-6 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='form__title text-xl lg:text-2xl'>Đăng ký</div>
              <div className='mt-3'>
                <Input
                  name='email'
                  placeholder='Email'
                  errorMessage={errors.email?.message}
                  register={register}
                  type='email'
                />
              </div>

              <div className='mt-2'>
                <Input
                  name='password'
                  type='password'
                  errorMessage={errors.password?.message}
                  placeholder='Password'
                  register={register}
                  autoComplete='on'
                />
              </div>

              <div className='mt-2'>
                <Input
                  name='confirm_password'
                  register={register}
                  placeholder='Confirm password'
                  type='password'
                  errorMessage={errors.confirm_password?.message}
                  autoComplete='on'
                />
              </div>

              <button type='submit' className='mt-5 w-full rounded-sm bg-orange px-2 py-4 text-white'>
                Đăng ký
              </button>

              <div className='mt-8 flex justify-center'>
                <span className='mr-1 text-gray-400'>Bạn đã có tài khoản?</span>
                <Link to='/login' className='text-orange'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
