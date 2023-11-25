import { Accordion } from '@/components/ui/accordion';
import { formatHoursLabel } from '@/libs/helpers/formatHoursLabel';
import { formatPriceLabel } from '@/libs/helpers/formatPriceLabel';
import { useAppSelector } from '@/libs/hooks/redux';
import { TicketFilteringCheckboxListList } from './TicketFilteringCheckboxList';
import { TicketFilteringHeader } from './TicketFilteringHeader';
import { TicketFilteringRangeSlider } from './TicketFilteringRangeSlider';

export function TicketFiltering() {
  const userCurrency = useAppSelector((state) => state.userReducer.userCurrency);

  const formatPrice = (value: number) => formatPriceLabel(value, userCurrency.currency, userCurrency.rate);

  return (
    <Accordion type="multiple" className="rounded-2xl bg-popover p-5" defaultValue={['totalPrice', 'airlines']}>
      <TicketFilteringHeader />
      <TicketFilteringRangeSlider code="totalPrice" formatLabel={formatPrice} />
      <TicketFilteringCheckboxListList code="airlines" />
      <TicketFilteringCheckboxListList code="originAirports" />
      <TicketFilteringCheckboxListList code="destinationAirports" />
      <TicketFilteringRangeSlider code="tripDurations" formatLabel={formatHoursLabel} />
      <TicketFilteringCheckboxListList code="stops" />
      <TicketFilteringCheckboxListList code="stopoverAirports" />
      <TicketFilteringRangeSlider code="stopoverDurations" formatLabel={formatHoursLabel} />
      <TicketFilteringCheckboxListList code="providers" />
    </Accordion>
  );
}
