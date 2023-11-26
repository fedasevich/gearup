import { Form } from '@/components/ui/form';
import { OrderPassengersFormValues } from '@/pages/OrderPage';
import { parseISO } from 'date-fns';
import { useFieldArray, useForm } from 'react-hook-form';
import { OrderForm } from './OrderForm';
import { OrderFormValues } from './validation';

interface OrderFormAdapterProps {
  initialValues: OrderFormValues[];
  infoFieldName: keyof Omit<OrderPassengersFormValues, 'email' | 'phoneNumber'>;
}

export function OrderFormAdapter({ initialValues, infoFieldName }: OrderFormAdapterProps) {
  const preparedInitialValues = initialValues.map((item) => ({
    ...item,
    dateOfBirth: parseISO(item.dateOfBirth as unknown as string),
    expirationDate: parseISO(item.expirationDate as unknown as string)
  }));
  const form = useForm({
    defaultValues: {
      [infoFieldName]: preparedInitialValues
    }
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: infoFieldName
  });

  return (
    <Form {...form}>
      <fieldset disabled>
        {fields.map((item, index) => {
          return <OrderForm key={item.id} index={index} infoFieldName={infoFieldName} />;
        })}
      </fieldset>
    </Form>
  );
}
