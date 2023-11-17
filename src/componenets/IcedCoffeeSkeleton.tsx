import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

type IcedCoffeeSkeletonProps = {
    cards: number;
  }
  const IcedCoffeeSkeleton = ({ cards } : IcedCoffeeSkeletonProps) => {
    return (
    <>
    {Array(cards).fill(0).map((_, i) => (
        <li key={i} className="w-64 p-4">
            <Skeleton className="aspect-[1/1] object-cover rounded-t-lg"/>
            <div className="flex justify-between items-center mt-4 space-y-2">
            <div className='w-1/3'><Skeleton /></div>
            <div className='w-10'><Skeleton /></div>
            </div>
            <div className="mt-4 space-y-2">
            <Skeleton/>
            </div>
            <div className="flex justify-between items-center mt-4 space-y-2">
            <div className='w-10'><Skeleton /></div>
            <div className='w-1/2'><Skeleton className='py-2 px-4 rounded'/></div>
            </div>
        </li>
    ))}
    </>);
};
  
export default IcedCoffeeSkeleton;
