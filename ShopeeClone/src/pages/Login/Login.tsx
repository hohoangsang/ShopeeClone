import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginSchema, loginSchema } from 'src/utils/rules';
import Input from 'src/components/Form/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { loginAccount } from 'src/api/auth.api';
import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils';
import { ResponseType } from 'src/types/utils.type';

export default function Login() {
  const {
    formState: { errors },
    register,
    handleSubmit,
    setError
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema)
  });

  const loginAccountMutation = useMutation({
    mutationFn: (body: LoginSchema) => {
      return loginAccount(body);
    }
  });

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        //set token and refresh token into cookie
        console.log(data);
      },
      onError: (error) => {
        if (isAxiosErrorUnprocessableEntity<ResponseType<LoginSchema>>(error)) {
          const formError = error.response?.data.data;

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof LoginSchema, {
                message: formError[key as keyof LoginSchema],
                type: 'Server'
              });
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
          <form className=' bg-white p-6 shadow-sm lg:col-span-2 lg:col-start-4' onSubmit={onSubmit} noValidate>
            <div className='form__title text-xl lg:text-2xl'>Đăng nhập</div>
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

            <button type='submit' className='mt-5 w-full rounded-sm bg-orange px-2 py-4 text-white'>
              Đăng nhập
            </button>

            <div className='mt-8 flex justify-center'>
              <span className='mr-1 text-gray-400'>Bạn chưa có tài khoản?</span>
              <Link to='/register' className='text-orange'>
                Đăng ký
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
