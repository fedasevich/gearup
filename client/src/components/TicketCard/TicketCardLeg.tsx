import { cn } from '@/libs/helpers/cn';
import { FlightLeg } from '@/libs/types/Flight/Flight.type';
import { ClassValue } from 'clsx';
import { useMemo } from 'react';
import { TicketCardLegAirlineImage } from './TicketCardLeg/TicketCardLegAirlineImage';
import { TicketCardLegAirlineName } from './TicketCardLeg/TicketCardLegAirlineName';
import { TicketCardLegDuration } from './TicketCardLeg/TicketCardLegDuration';
import TicketCardLegContext from './TicketCardLegContext';

interface TicketCardLegProps {
  leg: FlightLeg;
  className?: ClassValue;
}

export function TicketCardLeg({ leg, className }: TicketCardLegProps) {
  const memoizedLeg = useMemo(() => ({ leg }), [leg]);

  return (
    <TicketCardLegContext.Provider value={memoizedLeg}>
      <div
        className={cn(
          'flex flex-col items-center gap-8 only:h-full odd:pb-3 only:odd:pb-0 even:border-t even:pt-3 lg:flex-row',
          className
        )}
      >
        <TicketCardLegAirlineImage />
        <TicketCardLegAirlineName />
        <TicketCardLegDuration />
      </div>
    </TicketCardLegContext.Provider>
  );
}
