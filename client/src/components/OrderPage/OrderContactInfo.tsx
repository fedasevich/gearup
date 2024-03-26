import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { OrderPassengersFormValues } from '@/pages/OrderPage';
import { Bell, CornerLeftUp, Tag } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export function OrderContactInfo() {
  const form = useFormContext<OrderPassengersFormValues>();
  return (
    <div className="mb-4 flex flex-col rounded-2xl bg-popover p-5 md:flex-row ">
      <div className=" w-full items-center text-black dark:text-white">
        <p className="mb-3 text-lg font-medium">Контактна інформація</p>
        <div className="flex w-full">
          <div className="grid w-full grid-cols-1 grid-rows-2 gap-3 sm:grid-cols-2 sm:grid-rows-1 lg:w-2/3">
            <div className="">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Електрона пошта" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center pl-3">
                <CornerLeftUp size={20} />
                <div className="mt-4 flex items-center gap-2">
                  <Tag className="text-secondary" size={20} />
                  <p className="text-xs">Надішлемо квиток</p>
                </div>
              </div>
            </div>
            <div className="">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <PhoneInput
                      defaultCountry="ua"
                      {...field}
                      className="
                    w-full
                    text-popover
                    [&_.react-international-phone-country-selector-button]:h-10
                    [&_.react-international-phone-country-selector-button]:rounded-s-md
                    [&_.react-international-phone-country-selector-button]:border-input
                    [&_.react-international-phone-country-selector-button]:bg-background
                    [&_.react-international-phone-country-selector-button]:px-3
                    [&_.react-international-phone-country-selector-button__button-content]:gap-2
                    [&_.react-international-phone-country-selector-dropdown]:bg-background
                    [&_.react-international-phone-country-selector-dropdown]:text-muted-foreground
                    [&_.react-international-phone-input]:h-10
                    [&_.react-international-phone-input]:w-full
                    [&_.react-international-phone-input]:rounded-e-md
                    [&_.react-international-phone-input]:border-input
                    [&_.react-international-phone-input]:bg-background
                    [&_.react-international-phone-input]:font-medium
                    [&_.react-international-phone-input]:text-muted-foreground
                  "
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center pl-3">
                <CornerLeftUp size={20} />
                <div className="mt-4 flex items-center gap-2">
                  <Bell className="text-secondary" size={20} />
                  <p className="text-xs">Повідомимо про зміни</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
