import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HIGHEST_YEAR, LOWEST_YEAR } from '@/libs/constants/years';
import { cn } from '@/libs/helpers/cn';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { DropdownCalendar } from '../ui/dropdown-calendar';
import { TicketSearchFormData } from './TicketSearch';

interface TicketDatePickerProps {
  field: keyof TicketSearchFormData;
  title: string;
}

export function TicketDatePicker({ field, title }: TicketDatePickerProps) {
  const {
    control,
    watch,
    formState: { errors }
  } = useFormContext();

  const date = watch(field);

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="col-span-2 min-h-[56px] rounded-none border-0 border-r-secondary sm:col-span-1 sm:border-r-[1px] sm:even:rounded-bl-2xl lg:col-span-1 lg:even:rounded-none"
      >
        <Button
          variant="outline"
          className={cn(
            'mb-[1px] flex h-auto w-full flex-row items-center justify-start bg-popover px-4 py-2 text-start even:border-r-[1px] sm:mb-0',
            !!errors[field] && 'shadow-[inset_0px_0px_8px_0px_#ff0000]'
          )}
        >
          <div className="flex w-full flex-col justify-between">
            <p className="text-gray-400">{title}</p>
            <p className="overflow-hidden text-clip whitespace-nowrap text-black dark:text-white">
              {date ? format(date, 'd MMMM, E', { locale: uk }) : 'Оберіть дату'}
            </p>
          </div>
          <CalendarIcon className="ml-auto hidden h-5 w-5 text-secondary xl:block" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Controller
          control={control}
          name={field}
          render={({ field }) => (
            <DropdownCalendar
              fromYear={LOWEST_YEAR}
              toYear={HIGHEST_YEAR}
              captionLayout="dropdown-buttons"
              mode="single"
              selected={field.value as Date}
              onSelect={field.onChange}
              disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
              initialFocus
            />
          )}
        />
      </PopoverContent>
    </Popover>
  );
}
