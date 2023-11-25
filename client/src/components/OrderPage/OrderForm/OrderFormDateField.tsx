import { Button } from '@/components/ui/button';
import { DropdownCalendar } from '@/components/ui/dropdown-calendar';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HIGHEST_YEAR, LOWEST_YEAR } from '@/libs/constants/years';
import { cn } from '@/libs/helpers/cn';
import { OrderPassengersFormValues } from '@/pages/OrderPage';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { OrderDynamicField } from './types';

interface OrderFormDateFieldProps {
  form: UseFormReturn<OrderPassengersFormValues>;
  name: OrderDynamicField<Date>;
  placeholder: string;
}

export function OrderFormDateField({ form, name, placeholder }: OrderFormDateFieldProps) {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                  >
                    {field.value ? format(field.value, 'dd.MM.yyyy', { locale: uk }) : placeholder}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <DropdownCalendar
                  captionLayout="dropdown-buttons"
                  fromYear={LOWEST_YEAR}
                  toYear={HIGHEST_YEAR}
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
