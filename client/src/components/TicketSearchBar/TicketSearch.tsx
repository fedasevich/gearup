import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { SEARCH_ROUTE } from '@/libs/constants/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeftRight } from 'lucide-react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { AirportCombobox } from './AirportCombobox';
import { PassengersClass } from './PassengersClass';
import { TicketDatePicker } from './TicketDatePicker';
import { useTicketSearchSchema } from './validation';

export type TicketSearchFormData = {
  from: string;
  to: string;
  departureDate: Date;
  arrivalDate?: Date | undefined;
  numberOfAdults: number;
  numberOfChildrens: number;
  numberOfInfants: number;
  cabinClass: string;
};

export function TicketSearch() {
  const ticketSearchSchema = useTicketSearchSchema();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { state }: { state: TicketSearchFormData } = useLocation();

  console.log({
    ...state,
    numberOfAdults: state?.numberOfAdults || 0,
    numberOfChildrens: state?.numberOfChildrens || 0,
    numberOfInfants: state?.numberOfInfants || 0
  });

  const form = useForm<TicketSearchFormData>({
    resolver: yupResolver<TicketSearchFormData>(ticketSearchSchema),
    mode: 'onSubmit',
    defaultValues: {
      ...state,
      numberOfAdults: state?.numberOfAdults || 0,
      numberOfChildrens: state?.numberOfChildrens || 0,
      numberOfInfants: state?.numberOfInfants || 0
    }
  });

  const {
    getValues,
    setValue,
    handleSubmit
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } = form;

  const handleSwapClick = () => {
    const from = getValues('from');
    const to = getValues('to');
    setValue('from', to);
    setValue('to', from);
  };

  const onSubmit = (data: TicketSearchFormData) => {
    return navigate(SEARCH_ROUTE, {
      state: data
    });
  };

  const handleInvalidSearch = (errors: FieldErrors<TicketSearchFormData>) => {
    const joinedErrors = Object.values(errors)
      .map((error) => error.message)
      .join(', ');

    toast({
      variant: 'destructive',
      title: 'Форма пошуку була заповнена невірно',
      description: joinedErrors
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit, handleInvalidSearch)} className="mt-10">
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-3  lg:flex-row">
            <div className="grid w-full grid-cols-4 lg:grid-cols-5">
              <div className="relative col-span-4 flex items-center lg:col-span-2">
                <AirportCombobox destination="Звідки" field="from" />
                <Button
                  variant="ghost"
                  className="absolute right-[calc(50%-12px)] z-50 h-6 rounded-full p-0"
                  type="button"
                  onClick={handleSwapClick}
                >
                  <ArrowLeftRight className="rounded-full border-[1px] border-secondary bg-popover p-1 text-secondary" />
                </Button>
                <AirportCombobox destination="Куди" field="to" />
              </div>
              <TicketDatePicker field="departureDate" title="Туди" />
              <TicketDatePicker field="arrivalDate" title="Назад" />
              <div className="col-span-4 sm:col-span-2 lg:col-span-1">
                <PassengersClass />
              </div>
            </div>
            <Button
              variant="secondary"
              className="min-h-[56px] w-full rounded-2xl px-10 hover:bg-teal-500 sm:w-1/2 lg:w-auto"
            >
              Знайти
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
