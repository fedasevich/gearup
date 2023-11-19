import { useAppSelector } from '@/libs/hooks/redux';
import { useTicketCardLegContext } from '../TicketCardLegContext';

export function TicketCardLegAirlineName() {
  const {
    leg: { airlineCodes }
  } = useTicketCardLegContext();

  const airlines = useAppSelector((state) => state.searchReducer.airlines);

  if (!airlines) return null;

  const firstArline = airlineCodes[0];
  return (
    <div className="flex w-3/12">
      <p>{airlines[firstArline].name}</p>
    </div>
  );
}
