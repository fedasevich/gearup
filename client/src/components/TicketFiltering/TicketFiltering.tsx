import { Accordion } from '../ui/accordion';
import { TicketFilteringCheckboxListList } from './TicketFilteringCheckboxList';
import { TicketFilteringHeader } from './TicketFilteringHeader';
import { TicketFilteringRangeSlider } from './TicketFilteringRangeSlider';
import { formatSliderHoursLabel, formatSliderPriceLabel } from './helpers';

export function TicketFiltering() {
  return (
    <Accordion type="multiple" className="rounded-2xl bg-popover p-5" defaultValue={['totalPrice', 'airlines']}>
      <TicketFilteringHeader />
      <TicketFilteringRangeSlider code="totalPrice" formatLabel={formatSliderPriceLabel} />
      <TicketFilteringCheckboxListList code="airlines" />
      <TicketFilteringCheckboxListList code="originAirports" />
      <TicketFilteringCheckboxListList code="destinationAirports" />
      <TicketFilteringRangeSlider code="tripDurations" formatLabel={formatSliderHoursLabel} />
      <TicketFilteringCheckboxListList code="stops" />
      <TicketFilteringCheckboxListList code="stopoverAirports" />
      <TicketFilteringRangeSlider code="stopoverDurations" formatLabel={formatSliderHoursLabel} />
      <TicketFilteringCheckboxListList code="providers" />
    </Accordion>
  );
}
