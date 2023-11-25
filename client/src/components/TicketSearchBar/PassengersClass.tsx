/* eslint-disable no-use-before-define */
import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/libs/helpers/cn';
import { ChevronDown, MinusCircle, PlusCircle } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { TicketSearchFormData } from './TicketSearch';

const ticketClasses = [
  { class: 'Economy', title: 'Економ-клас' },
  { class: 'Business', title: 'Бізнес-клас' },
  { class: 'First', title: 'Перший клас' },
  { class: 'Premium_Economy', title: 'Преміум-економ' }
];

const ticketClassesMap: { [index: string]: string } = {
  Economy: 'Економ-клас',
  Business: 'Бізнес-клас',
  First: 'Перший клас',
  Premium_Economy: 'Преміум-економ'
};

const ticketPassengers: PassengerCounterProps[] = [
  { title: 'Дорослі', description: 'Старші 12 років', field: 'numberOfAdults' },
  { title: 'Діти', description: 'Від 2 до 12 років', field: 'numberOfChildrens' },
  { title: 'Немовлята', description: 'До 2 років', field: 'numberOfInfants' }
];

export function PassengersClass() {
  const {
    control,
    getValues,
    watch,
    formState: { errors }
  } = useFormContext<TicketSearchFormData>();

  const passengerCount = ticketPassengers.reduce(
    (acc, tickets) => acc + ((getValues(tickets.field) as number) || 0),
    0
  );

  const isError = ticketPassengers.some((ticket) => errors[ticket.field]) || errors.cabinClass;

  const cabinClass: string = watch('cabinClass') || '';

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="min-h-[56px] rounded-none rounded-b-2xl border-0 sm:rounded-none sm:rounded-br-2xl lg:rounded-e-2xl"
      >
        <Button
          variant="outline"
          className={cn(
            'flex h-full w-full flex-row items-center justify-start bg-popover px-4 py-2 text-start',
            isError && 'shadow-[inset_0px_0px_8px_0px_#ff0000]'
          )}
        >
          <div className="flex w-full flex-col justify-between">
            <p className="overflow-hidden text-clip whitespace-nowrap text-gray-400">Пасажири, клас</p>
            <p className="overflow-hidden text-clip whitespace-nowrap text-black dark:text-white">
              {passengerCount === 1 ? `${passengerCount} пасажир` : `${passengerCount} пасажирів`}
              {ticketClassesMap[cabinClass] && `, ${(ticketClassesMap[cabinClass] as string) || ''}`}
            </p>
          </div>
          <ChevronDown className="ml-auto h-5 w-5 text-secondary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="">
          {ticketPassengers.map((passenger) => (
            <PassengerCounter {...passenger} key={passenger.title} />
          ))}
        </div>
        <Separator className="my-4 bg-secondary " />
        <Controller
          control={control}
          name="cabinClass"
          render={({ field }) => (
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
              {ticketClasses.map((ticket) => (
                <FormItem className="flex items-center space-x-3 space-y-0" key={ticket.class}>
                  <FormControl>
                    <RadioGroupItem value={ticket.class} />
                  </FormControl>
                  <FormLabel className="font-normal">{ticket.title}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          )}
        />
      </PopoverContent>
    </Popover>
  );
}

interface PassengerCounterProps {
  title: string;
  description: string;
  field: keyof TicketSearchFormData;
}

export function PassengerCounter({ title, description, field }: PassengerCounterProps) {
  const { watch, setValue } = useFormContext();

  const fieldValue = watch(field);

  const handleMinusClick = () => {
    const decrementedValue = Math.max((fieldValue || 0) - 1, 0);
    setValue(field, decrementedValue);
  };

  const handlePlusClick = () => {
    const incrementedValue = (fieldValue || 0) + 1;
    setValue(field, incrementedValue);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="">
          <p>{title}</p>
          <p className="text-sm text-gray-400"> {description}</p>
        </div>
        <div className="flex flex-row items-center">
          <Button onClick={handleMinusClick} variant="ghost" className="h-5 w-5 rounded-full p-0" size="icon">
            <MinusCircle />
          </Button>
          <p className="w-10 px-3 text-center">{fieldValue || 0}</p>
          <Button onClick={handlePlusClick} variant="ghost" className=" h-5 w-5 rounded-full p-0" size="icon">
            <PlusCircle />
          </Button>
        </div>
      </div>
    </>
  );
}
