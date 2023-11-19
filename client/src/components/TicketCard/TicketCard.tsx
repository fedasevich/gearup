import { MergedFlight } from '@/libs/types/Flight/Flight.type';
import { TicketCardLeg } from './TicketCardLeg';
import { TicketCardLegPrice } from './TicketCardLegPrice';

interface TicketCardProps {
  ticket: MergedFlight;
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="mb-4 flex rounded-2xl bg-popover p-5">
      {/* <p>{ticket.id}</p>
        <p>{ticket.price.amount}</p>
        <p>{ticket.code}</p>
        <p>Price:{ticket.price.amount}</p>
        <p>Airline: {ticket.legs.map((leg) => leg.airlineCodes.join(', '))}</p>
        <p>stops: {ticket.legs.map((leg) => leg.stopoverCode)}</p>
        <p>provider: {ticket.providerCode}</p>
        <p>duration: {ticket.legs.map((leg) => leg.durationMinutes)}</p>
        <p>score: {ticket.score}</p> */}
      <div className="w-9/12  pr-4">
        {ticket.legs.map((leg) => (
          <TicketCardLeg leg={leg} key={leg.id} />
        ))}
      </div>
      <div className="w-3/12 ">
        <TicketCardLegPrice price={ticket.price.amount} />
      </div>
    </div>
  );
}
