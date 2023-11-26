import { Loader } from '@/components/Loader/Loader';
import { OrderFormAdapter } from '@/components/OrderPage/OrderForm/OrderFormAdapter';
import { TicketCardLeg } from '@/components/TicketCard/TicketCardLeg';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { formatPriceLabel } from '@/libs/helpers/formatPriceLabel';
import { useAppSelector } from '@/libs/hooks/redux';
import { flightApi } from '@/store/reducers/flight/FlightApi';

export function OrdersPage() {
  const userCurrency = useAppSelector((state) => state.userReducer.userCurrency);

  const { data: flights, isLoading } = flightApi.useGetAllQuery();
  const [deleteFlight] = flightApi.useDeleteFlightMutation();

  if (isLoading) return <Loader />;
  if (!flights?.length)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className=" flex w-1/2 flex-col items-center text-center">
          <img
            src="https://assets.wego.com/image/upload/c_fit,f_auto,fl_lossy,q_auto:low,w_192,h_192/v1584411473/web/no-results.png"
            alt="Нічого не було знайдено"
            className="mb-3 w-28"
          />
          <h4 className="text-2xl font-bold">Не знайдено жодного квитка</h4>
          <p>Вибачте, але у вас немає активних квитків.</p>
        </div>
      </div>
    );

  console.log(flights);

  const handleReturnTicketClick = (id: number) => {
    deleteFlight(id)
      .unwrap()
      .then(() => {
        toast({ variant: 'default', title: 'Успіх!', description: 'Квиток було успішно повернено' });
      });
  };

  return (
    <div className="mb-4 mt-10 flex flex-1 items-start justify-center">
      <div className="w-full px-4  md:w-10/12 md:px-0 lg:w-11/12 xl:w-10/12 2xl:w-3/4">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-4">
          <div className="mb-4 flex w-full flex-col rounded-2xl bg-popover p-5 md:flex-row ">
            <Accordion type="multiple" className="w-full rounded-2xl bg-popover p-5">
              {flights.map(({ flightData, id }) => {
                return (
                  <AccordionItem
                    value={id.toString()}
                    className="mb-3 flex flex-col rounded-xl bg-gray-100 dark:bg-section-background"
                    key={flightData.state.selectedTicket.id}
                  >
                    <AccordionTrigger className="[&>*:last-child]:mx-5">
                      <div className="flex w-full flex-col">
                        {flightData.state.selectedTicket.legs.map((leg) => (
                          <TicketCardLeg key={leg.id} leg={leg} className="w-full lg:[&>*:last-child]:w-full" />
                        ))}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <fieldset disabled>
                        {flightData.adultsInfo && (
                          <OrderFormAdapter initialValues={flightData.adultsInfo} infoFieldName="adultsInfo" />
                        )}
                        {flightData.childrensInfo && (
                          <OrderFormAdapter initialValues={flightData.childrensInfo} infoFieldName="childrensInfo" />
                        )}
                        {flightData.infantsInfo && (
                          <OrderFormAdapter initialValues={flightData.infantsInfo} infoFieldName="infantsInfo" />
                        )}
                      </fieldset>
                      <div className="flex items-center justify-between gap-4 px-5 pt-4 ">
                        <div className="flex gap-2">
                          <p className="text-lg font-medium dark:text-white">Всього:</p>
                          <p className="text-lg font-bold ">
                            {formatPriceLabel(
                              flightData.state.selectedTicket.price.amount *
                                (flightData.state.numberOfAdults +
                                  flightData.state.numberOfChildrens +
                                  flightData.state.numberOfInfants),
                              userCurrency.currency,
                              userCurrency.rate
                            )}
                          </p>
                        </div>
                        <Button className="bg-red-500 text-white" onClick={() => handleReturnTicketClick(id)}>
                          Повернути квиток
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
