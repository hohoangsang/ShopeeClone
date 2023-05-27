import NonStarFilled from '../Star/NonStarFilled';
import StarFilled from '../Star/StarFilled';

export default function ProductRating({ rating }: { rating: number }) {
  const handleWidth = (num: number) => {
    if (num <= rating) return '100%';
    if (num > rating && num - rating < 1) return (rating - Math.floor(rating)) * 100 + '%';
    return '0%';
  };

  return (
    <div className='flex items-end gap-[2px]'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div className='relative' key={index}>
            <div className='absolute left-0 top-0 h-full overflow-hidden' style={{ width: handleWidth(index + 1) }}>
              <StarFilled />
            </div>

            <NonStarFilled />
          </div>
        ))}
    </div>
  );
}
