import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrderPassengersFormValues } from '@/pages/OrderPage';
import { UseFormReturn } from 'react-hook-form';
import { OrderDynamicField } from './types';

interface OrderFormSelectFieldProps {
  form: UseFormReturn<OrderPassengersFormValues>;
  name: OrderDynamicField<string>;
  options: string[];
  placeholder: string;
}

export function OrderFormSelectField({ form, name, options, placeholder }: OrderFormSelectFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem id={name}>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl id={name}>
              <SelectTrigger className="text-muted-foreground">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
