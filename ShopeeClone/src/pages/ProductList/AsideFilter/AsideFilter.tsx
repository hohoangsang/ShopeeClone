import React from 'react';
import { Link } from 'react-router-dom';

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
    </div>
  );
}
