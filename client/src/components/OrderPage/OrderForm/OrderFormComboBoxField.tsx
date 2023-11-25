import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/libs/helpers/cn';
import { Check, ChevronsUpDown } from 'lucide-react';

import { OrderPassengersFormValues } from '@/pages/OrderPage';
import { UseFormReturn } from 'react-hook-form';
import { countriesInUkrainian } from './countries';
import { OrderDynamicField } from './types';

interface OrderFormComboBoxFieldProps {
  form: UseFormReturn<OrderPassengersFormValues>;
  name: OrderDynamicField<string>;
  placeholder: string;
}

export function OrderFormComboBoxField({ form, name, placeholder }: OrderFormComboBoxFieldProps) {
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
                    role="combobox"
                    className={cn('justify-between', !field.value && 'text-muted-foreground')}
                  >
                    {field.value ? countriesInUkrainian.find((country) => country === field.value) : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className=" p-0">
                <Command>
                  <CommandInput placeholder="Знайти країну..." />
                  <ScrollArea className="h-[170px]">
                    <CommandEmpty>Країна не знайдена.</CommandEmpty>
                    <CommandGroup>
                      {countriesInUkrainian.map((country) => (
                        <CommandItem
                          value={country}
                          key={country}
                          onSelect={() => {
                            form.setValue(name, country);
                          }}
                        >
                          <Check
                            className={cn('mr-2 h-4 w-4', country === field.value ? 'opacity-100' : 'opacity-0')}
                          />
                          {country}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </ScrollArea>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
