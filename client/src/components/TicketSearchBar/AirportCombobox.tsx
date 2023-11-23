import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/libs/helpers/cn';
import { useDebounce } from '@/libs/hooks/useDebounce';
import { Airport } from '@/libs/types/Airport/Airport.type';
import { airportApi } from '@/store/reducers/airport/AirportApi';
import { useFormContext } from 'react-hook-form';
import { TicketSearchFormData } from './TicketSearch';

interface AirportComboboxProps {
  destination: string;
  field: keyof TicketSearchFormData;
}

export function AirportCombobox({ destination, field }: AirportComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [airports, setAirports] = useState<Airport[]>([]);

  const {
    watch,
    setValue: onIcaoChange,
    formState: { errors }
  } = useFormContext();

  const icao = watch(field);

  const debouncedValue = useDebounce<string>(search, 500);

  const handleValueChange = (search: string) => {
    setSearch(search);
  };

  const [airportAutocomplete] = airportApi.useLazyAirportAutocompleteQuery();

  useEffect(() => {
    if (!debouncedValue.length) return setAirports([]);

    airportAutocomplete(debouncedValue)
      .unwrap()
      .then((data) => {
        setAirports(data);
      });
  }, [debouncedValue]);

  useEffect(() => {
    if (!icao) return;
    airportAutocomplete(icao)
      .unwrap()
      .then((data) => {
        setAirports(data);
      });
  }, [icao]);

  const handleSelect = (currentValue: string) => {
    const [icao] = currentValue.split('.');
    onIcaoChange(field, icao);
    setOpen(false);
  };

  const foundAirportByIcao = icao ? airports.find((airport) => airport.icao === icao.toUpperCase())?.name : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="mb-[2px] min-h-[56px] w-full rounded-none border-0 border-r-secondary bg-popover
        text-black first:rounded-ss-2xl
        first:border-r-[1px] dark:text-white
        lg:mb-0 lg:first:rounded-s-2xl lg:odd:border-r-[1px] lg:odd:border-r-secondary
        [&:nth-child(3)]:rounded-se-2xl lg:[&:nth-child(3)]:rounded-none
        lg:[&:nth-child(3)]:border-r-[1px]
        "
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'relative flex h-full w-full flex-row items-center justify-start px-4 py-2 text-start',
            !!errors[field] && 'shadow-[inset_0px_0px_8px_0px_#ff0000]'
          )}
        >
          <div className="flex w-full flex-col justify-between">
            <p className="text-gray-400">{destination}</p>
            <p className="min-h-[5] ">{foundAirportByIcao || 'Оберіть аеропорт'}</p>
          </div>
          <p
            className={cn(
              'hidden text-gray-400 md:block',
              foundAirportByIcao?.split(' ').length === 3 && 'md:hidden xl:block'
            )}
          >
            {icao?.toUpperCase()}
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search airport..." onValueChange={handleValueChange} />
          <CommandEmpty>No airport found.</CommandEmpty>
          <CommandGroup>
            {airports.map((airport) => (
              <CommandItem
                key={airport.id}
                value={`${airport.icao}.${airport.name}.${airport.city}.${airport.code}`}
                onSelect={handleSelect}
              >
                <Check className={cn('mr-2 h-4 w-4', icao === airport.icao ? 'opacity-100' : 'opacity-0')} />
                {airport.name} {airport.icao}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
