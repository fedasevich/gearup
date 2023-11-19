import { useAppSelector } from '@/libs/hooks/redux';
import { Button } from '../ui/button';

interface TicketCardLegPriceProps {
  price: number;
}

export function TicketCardLegPrice({ price }: TicketCardLegPriceProps) {
  const currency = useAppSelector((state) => state.userReducer.userCurrency);

  return (
    <div className="flex h-full flex-col items-center justify-center border-t pl-0 pt-4 text-center md:border-l md:border-t-0 md:pl-4 md:pt-0">
      <p className=" text-xl font-bold dark:text-white">
        {(price * currency.rate).toFixed(0)}
        {currency.currency}
      </p>
      <p className="mb-2 text-sm">за людину</p>
      <Button variant="secondary" className="w-36 md:w-full">
        <p>Обрати квиток</p>
      </Button>
    </div>
  );
}
