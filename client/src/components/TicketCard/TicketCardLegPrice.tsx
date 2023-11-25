/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ORDER_ROUTE } from '@/libs/constants/routes';
import { formatPriceLabel } from '@/libs/helpers/formatPriceLabel';
import { useAppSelector } from '@/libs/hooks/redux';
import { MergedFlight } from '@/libs/types/Flight/Flight.type';
import { useLocation, useNavigate } from 'react-router-dom';

interface TicketCardLegPriceProps {
  price: number;
  ticket: MergedFlight;
}

export function TicketCardLegPrice({ price, ticket }: TicketCardLegPriceProps) {
  const currency = useAppSelector((state) => state.userReducer.userCurrency);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useAppSelector((state) => state.userReducer.user);
  const { state } = useLocation();

  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate(ORDER_ROUTE, { state: { ...state, selectedTicket: ticket } });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center border-t pl-0 pt-4 text-center md:border-l md:border-t-0 md:pl-4 md:pt-0">
      <p className=" text-xl font-bold dark:text-white">{formatPriceLabel(price, currency.currency, currency.rate)}</p>
      <p className="mb-2 text-sm">за людину</p>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="">
              <Button
                variant="secondary"
                className="w-36 hover:bg-teal-500 md:w-full"
                onClick={handleBuyClick}
                disabled={!user}
              >
                <p>Обрати квиток</p>
              </Button>
            </div>
          </TooltipTrigger>
          {!user && (
            <TooltipContent side="bottom" className="text-center">
              <p>You have to be authorised to buy ticket.</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
