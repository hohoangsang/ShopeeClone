import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getRules } from 'src/utils/rules';

type FormState = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<FormState>();

  const rules = getRules();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className='flex items-center bg-orange bg-contain lg:h-auth__hero lg:min-h-auth_hero lg:bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7qvcy-lfuqe4hftedq21")] lg:bg-center lg:bg-no-repeat lg:py-10'>
      <div className='mx-auto w-full max-w-7xl px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5'>
          <form className=' bg-white p-6 shadow-sm lg:col-span-2 lg:col-start-4' onSubmit={onSubmit}>
            <div className='form__title text-xl lg:text-2xl'>Đăng nhập</div>
            <div>
              <input
                type='email'
                className='mt-3 w-full rounded-sm border border-gray-300 p-3 shadow-sm outline-none focus:border-gray-500'
                placeholder='Email'
                {...register('email', rules.email)}
              />

              <div className='mt-1 min-h-[1.25rem] text-red-500'>{errors.email?.message}</div>
            </div>

            <div>
              <input
                type='password'
                className='mt-2 w-full rounded-sm border border-gray-300 p-3 shadow-sm outline-none focus:border-gray-500'
                placeholder='Password'
                autoComplete='on'
                {...register('password', rules.password)}
              />

              <div className='mt-1 min-h-[1.25rem] text-red-500'>{errors.password?.message}</div>
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
