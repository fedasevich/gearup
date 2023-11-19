import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppDispatch, useAppSelector } from '@/libs/hooks/redux';
import { setFilter } from '@/store/reducers/SearchSlice';
import { ticketFilterFieldToReduxField, ticketFilterFieldToUkrainianName } from './enums';
import { CheckedAllianceElement, FiltersState } from './types';

interface TicketFilteringCheckboxListProps {
  code: {
    [K in keyof FiltersState]: FiltersState[K] extends CheckedAllianceElement[] ? K : never;
  }[keyof FiltersState];
}

export function TicketFilteringCheckboxListList({ code }: TicketFilteringCheckboxListProps) {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.searchReducer.filter);
  const mappedName = useAppSelector(
    (state) => ticketFilterFieldToReduxField[code] && state.searchReducer[ticketFilterFieldToReduxField[code]]
  );

  if (!state) {
    return null;
  }

  const arrayToMap = state[code];

  const handleChange = (checked: boolean, codeToChange: string) => {
    const updatedArray = arrayToMap.map((item) => (item.code === codeToChange ? { ...item, checked } : item));

    dispatch(
      setFilter({
        ...state,
        [code]: updatedArray
      })
    );
  };

  return (
    <AccordionItem value={code} className="flex flex-col">
      <AccordionTrigger>{ticketFilterFieldToUkrainianName[code]}</AccordionTrigger>
      <AccordionContent>
        {arrayToMap.map((code) => (
          <div className="mb-1 flex items-start gap-2" key={code.code}>
            <Checkbox
              id={code.code}
              checked={code.checked}
              className="h-5 w-5"
              onCheckedChange={(checked) => handleChange(!!checked, code.code)}
            />
            <label htmlFor={code.code} className="dark:text-white">
              {mappedName ? mappedName[code.code].name : code.code}
            </label>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
