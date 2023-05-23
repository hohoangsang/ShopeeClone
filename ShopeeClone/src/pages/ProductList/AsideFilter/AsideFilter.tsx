import { Link } from 'react-router-dom';
import Button from 'src/components/Button';
import Input from 'src/components/Form/Input';
import NonStarFilled from 'src/components/Star/NonStarFilled';
import StarFilled from 'src/components/Star/StarFilled';

export default function AsideFilter() {
  return (
    <div>
      <Link to={'/'} className='flex items-center gap-2 font-semibold'>
        <svg viewBox='0 0 12 10' className='h-3 w-4 shrink-0 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>

        <span className='flex-grow capitalize'>Tất cả danh mục</span>
      </Link>

      <div className='my-4 h-[1px] bg-gray-200' />

      <div className='mb-10 text-sm'>
        <ul className='font-sm'>
          <li className='ml-3 mt-4'>
            <Link to={'/'} className='relative capitalize text-orange'>
              <svg viewBox='0 0 4 7' className='absolute -left-3 top-1 h-2 w-2 fill-current'>
                <polygon points='4 3.5 0 0 0 7'></polygon>
              </svg>
              Đồng hồ
            </Link>
          </li>
          <li className='ml-3 mt-4'>
            <Link to={'/'} className='relative capitalize'>
              Đồng hồ nam
            </Link>
          </li>
          <li className='ml-3 mt-4'>
            <Link to={'/'} className='relative capitalize'>
              Đồng hồ nữ
            </Link>
          </li>
          <li className='ml-3 mt-4'>
            <Link to={'/'} className='relative capitalize'>
              Bộ đồng hộ & đồng hồ cặp
            </Link>
          </li>
          <li className='ml-3 mt-4'>
            <Link to={'/'} className='relative capitalize'>
              Đồng hồ trẻ em
            </Link>
          </li>
          <li className='ml-3 mt-4'>
            <Link to={'/'} className='relative capitalize'>
              Phụ kiện đồng hộ
            </Link>
          </li>
          <li className='ml-3 mt-4'>
            <Link to={'/'} className='relative capitalize'>
              Khác
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <div className='flex items-center gap-2 font-semibold'>
          <svg
            enableBackground='new 0 0 15 15'
            viewBox='0 0 15 15'
            x='0'
            y='0'
            className='h-3 w-4 flex-shrink stroke-current'
          >
            <g>
              <polyline
                fill='none'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit='10'
              ></polyline>
            </g>
          </svg>

          <span className='uppercase'>Bộ lọc tìm kiếm</span>
        </div>
      </div>

      <div className='my-4 h-[1px] bg-gray-200' />

      <div className='text-sm'>
        <span className='mb-6 capitalize'>Khoảng giá</span>
        <form className='my-4 flex items-center gap-3'>
          <Input
            name='from'
            placeholder='₫ TỪ'
            className='flex items-center'
            classNameInput='w-full rounded-sm border border-gray-300 shadow-sm outline-none px-2 py-1'
          />

          <div className='h-[1px] w-8 bg-gray-400' />

          <Input
            name='to'
            placeholder='₫ ĐẾn'
            className='flex items-center'
            classNameInput='w-full rounded-sm border border-gray-300 shadow-sm outline-none px-2 py-1'
          />
        </form>
        <Button
          className='w-full rounded-sm border-none bg-orange px-3 py-2 uppercase text-white shadow-sm focus:bg-orange/80'
          text='Áp dụng'
        />
      </div>

      <div className='my-4 h-[1px] bg-gray-200' />

      <div className='text-sm'>
        <span className='capitalize'>Đánh giá</span>

        <ul>
          <li className='mt-4 flex cursor-pointer items-center gap-2'>
            <div className='flex items-center gap-1'>
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
          </li>
          <li className='mt-4 flex cursor-pointer items-center gap-2'>
            <div className='flex items-center gap-1'>
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <NonStarFilled />
            </div>
            <span>trở lên</span>
          </li>
          <li className='mt-4 flex cursor-pointer items-center gap-2'>
            <div className='flex items-center gap-1'>
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <NonStarFilled />
              <NonStarFilled />
            </div>
            <span>trở lên</span>
          </li>
          <li className='mt-4 flex cursor-pointer items-center gap-2'>
            <div className='flex items-center gap-1'>
              <StarFilled />
              <StarFilled />
              <NonStarFilled />
              <NonStarFilled />
              <NonStarFilled />
            </div>
            <span>trở lên</span>
          </li>
          <li className='mt-4 flex cursor-pointer items-center gap-2'>
            <div className='flex items-center gap-1'>
              <StarFilled />
              <NonStarFilled />
              <NonStarFilled />
              <NonStarFilled />
              <NonStarFilled />
            </div>
            <span>trở lên</span>
          </li>
        </ul>
      </div>

      <div className='my-4 h-[1px] bg-gray-200' />

      <Button
        className='w-full rounded-sm border-none bg-orange px-3 py-2 text-sm uppercase text-white shadow-sm focus:bg-orange/80'
        text='Xóa tất cả'
      />
    </div>
  );
}
