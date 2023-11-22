/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrderPrice } from '@/components/OrderPage/OrderPrice';
import { TicketCardLeg } from '@/components/TicketCard/TicketCardLeg';
import { TicketSearchFormData } from '@/components/TicketSearchBar/TicketSearch';
import { toast } from '@/components/ui/use-toast';
import { MAIN_ROUTE, ORDERS_ROUTE } from '@/libs/constants/routes';
import { useAppSelector } from '@/libs/hooks/redux';
import { useFieldArray, useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { OrderBuyButton } from '@/components/OrderPage/OrderBuyButton';
import { OrderContactInfo } from '@/components/OrderPage/OrderContactInfo';
import { OrderForm } from '@/components/OrderPage/OrderForm/OrderForm';
import { OrderFormValues, useOrderFormSchema } from '@/components/OrderPage/OrderForm/validation';
import { Form } from '@/components/ui/form';
import { MergedFlight } from '@/libs/types/Flight/Flight.type';
import { flightApi } from '@/store/reducers/flight/FlightApi';
import { yupResolver } from '@hookform/resolvers/yup';

export interface OrderPageLocationState extends TicketSearchFormData {
  selectedTicket: MergedFlight;
}

export type OrderPassengersFormValues = {
  adultsInfo?: OrderFormValues[];
  childrensInfo?: OrderFormValues[];
  infantsInfo?: OrderFormValues[];
  email: string;
  phoneNumber: string;
};

const getInitialOrderFormValuesArray = (length: number) =>
  length > 0
    ? (Array.from({ length }).fill({
        gender: '',
        firstName: '',
        lastName: '',
        citizenship: '',
        documentType: '',
        documentSeriesNumber: ''
      }) as OrderFormValues[])
    : undefined;

export function OrderPage() {
  const { state }: { state: OrderPageLocationState } = useLocation();
  const user = useAppSelector((state) => state.userReducer.user);
  const orderFormSchema = useOrderFormSchema();
  const navigate = useNavigate();

  const form = useForm<OrderPassengersFormValues>({
    resolver: yupResolver(orderFormSchema),
    defaultValues: {
      adultsInfo: getInitialOrderFormValuesArray(state.numberOfAdults),
      childrensInfo: getInitialOrderFormValuesArray(state.numberOfChildrens),
      infantsInfo: getInitialOrderFormValuesArray(state.numberOfInfants),
      email: '',
      phoneNumber: ''
    },
    mode: 'onBlur'
  });
  const { fields: adultFields } = useFieldArray({
    control: form.control,
    name: 'adultsInfo'
  });
  const { fields: childrensFields } = useFieldArray({
    control: form.control,
    name: 'childrensInfo'
  });
  const { fields: infantFields } = useFieldArray({
    control: form.control,
    name: 'infantsInfo'
  });

  const [createFlight] = flightApi.useCreateFlightMutation();

  if (state === null || !user || !state.selectedTicket) {
    return <Navigate to={MAIN_ROUTE} />;
  }
  const handleSubmit = (data: OrderPassengersFormValues) => {
    createFlight({ ...data, state })
      .unwrap()
      .then(() => {
        toast({
          variant: 'default',
          title: 'Успіх!',
          description: 'Квиток було успішно замовлено'
        });
        navigate(ORDERS_ROUTE);
      });
  };

  return (
    <div className="mb-4 mt-10 flex items-center justify-center">
      <div className="flex w-full flex-col gap-6 px-4 md:w-10/12 md:px-0 lg:w-11/12 xl:w-10/12 xl:flex-row 2xl:w-3/4">
        <div className="flex w-full flex-col gap-4 xl:w-full 2xl:w-3/4">
          <div className="mb-4 flex flex-col rounded-2xl bg-popover p-5 md:flex-row ">
            <div className="w-full">
              {state.selectedTicket.legs.map((leg) => (
                <TicketCardLeg leg={leg} key={leg.id} className="w-full lg:[&>*:last-child]:w-full" />
              ))}
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <fieldset>
                {adultFields.map((item, index) => {
                  return <OrderForm key={item.id} index={index} infoFieldName="adultsInfo" />;
                })}
                {childrensFields.map((item, index) => {
                  return <OrderForm key={item.id} index={index} infoFieldName="childrensInfo" />;
                })}
                {infantFields.map((item, index) => {
                  return <OrderForm key={item.id} index={index} infoFieldName="infantsInfo" />;
                })}
                <OrderContactInfo />
              </fieldset>
              <OrderBuyButton />
            </form>
          </Form>
        </div>
        <div className="w-full xl:w-1/4">
          <div className="rounded-2xl bg-popover ">
            <OrderPrice />
          </div>
        </div>
      </div>
    </div>
  );
}
