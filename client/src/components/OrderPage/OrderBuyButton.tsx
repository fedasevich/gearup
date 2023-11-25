import { Button } from '@/components/ui/button';
import { OrderPassengersFormValues } from '@/pages/OrderPage';
import { useFormContext } from 'react-hook-form';

export function OrderBuyButton() {
  const {
    formState: { isValid }
  } = useFormContext<OrderPassengersFormValues>();
  return (
    <div className="mb-4 flex flex-col rounded-2xl bg-popover p-5 md:flex-row ">
      <div className=" flex w-full flex-col items-center justify-between gap-3 text-black dark:text-white md:flex-row">
        <p className="text-sm">Перевірте внесені дані і натисніть «Замовити»</p>
        <Button variant="secondary" className="px-14" disabled={!isValid}>
          Замовити
        </Button>
      </div>
    </div>
  );
}
