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
              <svg viewBox='0 0 9.5 8' className='h-3 w-3'>
                <defs>
                  <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                    <stop offset='0' stopColor='#ffca11'></stop>
                    <stop offset='1' stopColor='#ffad27'></stop>
                  </linearGradient>
                  <polygon
                    id='ratingStar'
                    points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                  ></polygon>
                </defs>
                <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth='1'>
                  <g transform='translate(-876 -1270)'>
                    <g transform='translate(155 992)'>
                      <g transform='translate(600 29)'>
                        <g transform='translate(10 239)'>
                          <g transform='translate(101 10)'>
                            <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar'></use>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <svg viewBox='0 0 9.5 8' className='h-3 w-3'>
                <defs>
                  <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                    <stop offset='0' stopColor='#ffca11'></stop>
                    <stop offset='1' stopColor='#ffad27'></stop>
                  </linearGradient>
                  <polygon
                    id='ratingStar'
                    points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                  ></polygon>
                </defs>
                <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth='1'>
                  <g transform='translate(-876 -1270)'>
                    <g transform='translate(155 992)'>
                      <g transform='translate(600 29)'>
                        <g transform='translate(10 239)'>
                          <g transform='translate(101 10)'>
                            <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar'></use>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <svg viewBox='0 0 30 30' className='h-3 w-3'>
                <defs>
                  <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                    <stop offset='0%' stopColor='#FFD211'></stop>
                    <stop offset='100%' stopColor='#FFAD27'></stop>
                  </linearGradient>
                </defs>
                <path
                  fill='none'
                  fillRule='evenodd'
                  stroke='url(#star__hollow)'
                  strokeWidth='2'
                  d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                ></path>
              </svg>
              <svg viewBox='0 0 30 30' className='h-3 w-3'>
                <defs>
                  <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                    <stop offset='0%' stopColor='#FFD211'></stop>
                    <stop offset='100%' stopColor='#FFAD27'></stop>
                  </linearGradient>
                </defs>
                <path
                  fill='none'
                  fillRule='evenodd'
                  stroke='url(#star__hollow)'
                  strokeWidth='2'
                  d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                ></path>
              </svg>
              <svg viewBox='0 0 30 30' className='h-3 w-3'>
                <defs>
                  <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                    <stop offset='0%' stopColor='#FFD211'></stop>
                    <stop offset='100%' stopColor='#FFAD27'></stop>
                  </linearGradient>
                </defs>
                <path
                  fill='none'
                  fillRule='evenodd'
                  stroke='url(#star__hollow)'
                  strokeWidth='2'
                  d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                ></path>
              </svg>
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
