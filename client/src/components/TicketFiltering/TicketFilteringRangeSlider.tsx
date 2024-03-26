import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { useAppDispatch, useAppSelector } from '@/libs/hooks/redux';
import { useDebounce } from '@/libs/hooks/useDebounce';
import { StopoverDurations } from '@/libs/types/Flight/Flight.type';
import { setFilter } from '@/store/reducers/SearchSlice';
import { useEffect, useState } from 'react';
import { ticketFilterFieldToUkrainianName } from './enums';
import { FiltersState } from './types';

interface TicketFilteringCheckboxListProps {
  code: {
    [K in keyof FiltersState]: FiltersState[K] extends StopoverDurations ? K : never;
  }[keyof FiltersState];
  formatLabel: (value: number) => string;
}

export function TicketFilteringRangeSlider({ code, formatLabel }: TicketFilteringCheckboxListProps) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.searchReducer.filter);

  const [sliderValue, setSliderValue] = useState<StopoverDurations>({
    max: state?.[code]?.value?.max || -1,
    min: state?.[code]?.value?.min || -1
  });
  const debouncedValue = useDebounce<StopoverDurations>(sliderValue, 1000);

  useEffect(() => {
    if (!state || sliderValue.min === -1 || sliderValue.max === -1) return;

    dispatch(
      setFilter({
        ...state,
        [code]: { ...state[code], value: { ...sliderValue } }
      })
    );
  }, [debouncedValue]);

  if (!state) {
    return null;
  }
  const { min, max, value } = state[code];

  const handleChange = (minMaxArray: number[]) => {
    const [min, max] = minMaxArray;
    setSliderValue({ min, max });
  };

  return (
    <AccordionItem value={code} className="flex flex-col">
      <AccordionTrigger>{ticketFilterFieldToUkrainianName[code]}</AccordionTrigger>
      <AccordionContent className="px-4 pt-3 text-center">
        <Slider
          formatLabel={formatLabel}
          value={[value.min, value.max]}
          minStepsBetweenThumbs={2}
          min={min}
          max={max}
          step={5}
          onValueChange={handleChange}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
