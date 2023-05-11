import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginSchema, getRules, loginSchema } from 'src/utils/rules';
import Input from 'src/components/Form/Input';
import { yupResolver } from '@hookform/resolvers/yup';

type FormState = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema)
  });

  const rules = getRules();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className='flex items-center bg-orange bg-contain lg:h-auth__hero lg:min-h-auth_hero lg:bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7qvcy-lfuqe4hftedq21")] lg:bg-center lg:bg-no-repeat lg:py-10'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5'>
          <form className=' bg-white p-6 shadow-sm lg:col-span-2 lg:col-start-4' onSubmit={onSubmit}>
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
