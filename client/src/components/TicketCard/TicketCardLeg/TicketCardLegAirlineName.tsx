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
    <div className="flex w-full justify-center lg:w-3/12 lg:justify-start">
      <p>{airlines[firstArline].name}</p>
    </div>
  );
}
