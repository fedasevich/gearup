import { Button } from '../ui/button';

interface TicketCardLegPriceProps {
  price: number;
}

export function TicketCardLegPrice({ price }: TicketCardLegPriceProps) {
  const currency = '$';
  return (
    <div className="flex h-full flex-col justify-center border-l pl-4 text-center">
      <p className=" text-xl font-bold dark:text-white">
        {price}
        {currency}
      </p>
      <p className="mb-2 text-sm">за людину</p>
      <Button variant="secondary">
        <p>Обрати квиток</p>
      </Button>
    </div>
  );
}
