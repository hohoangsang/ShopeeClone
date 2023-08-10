import classNames from 'classnames';
import { Link, createSearchParams } from 'react-router-dom';
import { path } from 'src/constants/path';
import { purchasesStatus } from 'src/constants/purchases';
import { useQueryParams } from 'src/hooks/useQueryParams';

export default function PurchaseHistory() {
  const params = useQueryParams();

  const { status = purchasesStatus.all } = params;

  return (
    <div>
      <div className='flex items-center justify-center'>
        <Link
          to={{
            pathname: path.purchaseHistory,
            search: createSearchParams({
              ...params,
              status: String(purchasesStatus.all)
            }).toString()
          }}
          className={classNames('flex-1 bg-white py-4 text-center border-b-[2px]', {
            'border-b-orange': Number(status) === purchasesStatus.all,
            'border-b-gray-300': Number(status) !== purchasesStatus.all
          })}
        >
          Tất cả
        </Link>
        <Link
          to={{
            pathname: path.purchaseHistory,
            search: createSearchParams({
              ...params,
              status: String(purchasesStatus.waitForConfirmation)
            }).toString()
          }}
          className={classNames('flex-1 bg-white py-4 text-center border-b-[2px]', {
            'border-b-orange': Number(status) === purchasesStatus.waitForConfirmation,
            'border-b-gray-300': Number(status) !== purchasesStatus.waitForConfirmation
          })}
        >
          Chờ xác nhận
        </Link>
        <Link
          to={{
            pathname: path.purchaseHistory,
            search: createSearchParams({
              ...params,
              status: String(purchasesStatus.waitForPicking)
            }).toString()
          }}
          className={classNames('flex-1 bg-white py-4 text-center border-b-[2px]', {
            'border-b-orange': Number(status) === purchasesStatus.waitForPicking,
            'border-b-gray-300': Number(status) !== purchasesStatus.waitForPicking
          })}
        >
          Chờ lấy hàng
        </Link>
      </div>
    </div>
  );
}
