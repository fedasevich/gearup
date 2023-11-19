import { FlightLeg } from '@/libs/types/Flight/Flight.type';
import { useMemo } from 'react';
import { TicketCardLegAirlineImage } from './TicketCardLeg/TicketCardLegAirlineImage';
import { TicketCardLegAirlineName } from './TicketCardLeg/TicketCardLegAirlineName';
import { TicketCardLegDuration } from './TicketCardLeg/TicketCardLegDuration';
import TicketCardLegContext from './TicketCardLegContext';

interface TicketCardLegProps {
  leg: FlightLeg;
}

export function TicketCardLeg({ leg }: TicketCardLegProps) {
  const memoizedLeg = useMemo(() => ({ leg }), [leg]);

  return (
    <TicketCardLegContext.Provider value={memoizedLeg}>
      <div className="flex h-full items-center gap-8">
        <TicketCardLegAirlineImage />
        <TicketCardLegAirlineName />
        <TicketCardLegDuration />
      </div>
    </TicketCardLegContext.Provider>
  );
}
