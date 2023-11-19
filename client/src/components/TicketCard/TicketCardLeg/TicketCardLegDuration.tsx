import { useTicketCardLegContext } from '../TicketCardLegContext';
import Timeline from './TicketCardLegTimeline';

export function TicketCardLegDuration() {
  const {
    leg: { departureTime, arrivalTime, durationMinutes, segments, departureAirportCode, arrivalAirportCode }
  } = useTicketCardLegContext();

  console.log(segments);
  return (
    <div className="flex w-5/12 flex-col justify-between">
      <div className="flex justify-between">
        <p className="text-base font-semibold">{departureTime}</p>
        <p className="text-base font-semibold">{arrivalTime}</p>
      </div>
      <Timeline totalDuration={durationMinutes} segments={segments} />
      <div className="flex  justify-between">
        <p className="px-2 text-xs font-medium text-gray-400">{departureAirportCode}</p>
        <p className="px-2 text-xs font-medium text-gray-400">{arrivalAirportCode}</p>
      </div>
    </div>
  );
}
