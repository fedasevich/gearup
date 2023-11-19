import { MergedFlight } from '@/libs/types/Flight/Flight.type';
import { TicketCardLeg } from './TicketCardLeg';
import { TicketCardLegPrice } from './TicketCardLegPrice';

interface TicketCardProps {
  ticket: MergedFlight;
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="mb-4 flex flex-col rounded-2xl bg-popover p-5 md:flex-row">
      <div className="w-full pb-4 md:w-9/12 md:pb-0 md:pr-4">
        {ticket.legs.map((leg) => (
          <TicketCardLeg leg={leg} key={leg.id} />
        ))}
      </div>
      <div className="w-full md:w-3/12 ">
        <TicketCardLegPrice price={ticket.price.amount} />
      </div>
    </div>
  );
}
