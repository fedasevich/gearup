import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MAIN_ROUTE } from '@/libs/constants/routes';
import { formatPriceLabel } from '@/libs/helpers/formatPriceLabel';
import { useAppSelector } from '@/libs/hooks/redux';
import { OrderPageLocationState } from '@/pages/OrderPage';
import { format, parseISO } from 'date-fns';
import { uk } from 'date-fns/locale';
import { ArrowRight } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';

export function OrderPrice() {
  const { state }: { state: OrderPageLocationState } = useLocation();
  const user = useAppSelector((state) => state.userReducer.user);
  const tickets = useAppSelector((state) => state.searchReducer.searchData);
  const userCurrency = useAppSelector((state) => state.userReducer.userCurrency);

  if (state === null || !user) {
    return <Navigate to={MAIN_ROUTE} />;
  }

  const selectedTicket = tickets.find((ticket) => ticket.id === state.selectedTicketId);

  if (!selectedTicket) {
    return <Navigate to={MAIN_ROUTE} />;
  }

  return (
    <Accordion type="multiple" className="rounded-2xl bg-popover p-5" defaultValue={['totalPrice', 'airlines']}>
      <AccordionItem value="flight" className="flex flex-col">
        <AccordionTrigger>Переліт</AccordionTrigger>
        <AccordionContent className="px-4 ">
          {selectedTicket.legs.map((leg) => (
            <div className="flex flex-col " key={leg.id}>
              <div className="flex items-center gap-1">
                <p>{leg.departureAirportCode}</p>
                <ArrowRight size={16} />
                <p>{leg.arrivalAirportCode}</p>
              </div>
              <div className="flex items-center gap-1">
                <p>{format(parseISO(leg.departureDateTime), 'EEE d MMM yy', { locale: uk })}</p>
                <ArrowRight size={16} />
                <p>{format(parseISO(leg.arrivalDateTime), 'EEE d MMM yy', { locale: uk })}</p>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="tickets" className="flex flex-col">
        <AccordionTrigger>Авіаквитки</AccordionTrigger>
        <AccordionContent className="px-4 ">
          <div className="flex flex-col gap-2">
            <div className="gap flex justify-between">
              <p>Тариф</p>
              {formatPriceLabel(
                selectedTicket.price.amount - selectedTicket.price.taxAmount,
                userCurrency.currency,
                userCurrency.rate
              )}
            </div>
            <div className="flex justify-between">
              <p>Податок</p>
              {formatPriceLabel(selectedTicket.price.taxAmount, userCurrency.currency, userCurrency.rate)}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <div className="flex items-center justify-between gap-4 pt-4 ">
        <p className="font-medium">Всього</p>
        <p className="font-bold">
          {formatPriceLabel(selectedTicket.price.amount, userCurrency.currency, userCurrency.rate)}
        </p>
      </div>
    </Accordion>
  );
}
