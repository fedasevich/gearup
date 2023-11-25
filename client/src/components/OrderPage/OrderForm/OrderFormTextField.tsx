import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { OrderPassengersFormValues } from '@/pages/OrderPage';
import { UseFormReturn } from 'react-hook-form';
import { OrderDynamicField } from './types';

interface OrderFormTextFieldProps {
  form: UseFormReturn<OrderPassengersFormValues>;
  name: OrderDynamicField<string>;
  placeholder: string;
}

export function OrderFormTextField({ form, name, placeholder }: OrderFormTextFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
