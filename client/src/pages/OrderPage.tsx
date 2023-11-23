import { OrderForm } from '@/components/OrderPage/OrderForm/OrderForm';
import { useOrderFormSchema } from '@/components/OrderPage/OrderForm/validation';
import { OrderPrice } from '@/components/OrderPage/OrderPrice';
import { TicketCardLeg } from '@/components/TicketCard/TicketCardLeg';
import { TicketSearchFormData } from '@/components/TicketSearchBar/TicketSearch';
import { MAIN_ROUTE } from '@/libs/constants/routes';
import { useAppSelector } from '@/libs/hooks/redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';
import { InferType } from 'yup';

import { Form } from '@/components/ui/form';

export interface OrderPageLocationState extends TicketSearchFormData {
  selectedTicketId: string;
}

export function OrderPage() {
  const { state }: { state: OrderPageLocationState } = useLocation();
  const user = useAppSelector((state) => state.userReducer.user);
  const tickets = useAppSelector((state) => state.searchReducer.searchData);
  const orderFormSchema = useOrderFormSchema();
  const form = useForm<InferType<typeof orderFormSchema>>({
    resolver: yupResolver(orderFormSchema)
  });

  if (state === null || !user) {
    return <Navigate to={MAIN_ROUTE} />;
  }

  const selectedTicket = tickets.find((ticket) => ticket.id === state.selectedTicketId);

  if (!selectedTicket) {
    return <Navigate to={MAIN_ROUTE} />;
  }

  const handleSubmit = (data: InferType<typeof orderFormSchema>) => {
    console.log(data);
  };

  return (
    <div className="mb-4 mt-10 flex items-center justify-center">
      <div className="flex w-full gap-6 px-4 md:w-10/12 md:px-0 lg:w-11/12 xl:w-10/12 2xl:w-3/4">
        <div className="flex w-full flex-col gap-2 px-4">
          <div className="mb-4 flex flex-col rounded-2xl bg-popover p-5 md:flex-row ">
            <div className="w-full items-center">
              {selectedTicket.legs.map((leg) => (
                <TicketCardLeg leg={leg} key={leg.id} />
              ))}
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {Object.entries(state).map(([field, value]) => (
                <OrderForm amount={value} field={field} />
              ))}
            </form>
          </Form>
        </div>
        <div className="2xl:w-1/4">
          <div className="rounded-2xl bg-popover ">
            <OrderPrice />
          </div>
        </div>
      </div>
    </div>
  );
}
