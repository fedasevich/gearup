import { FlightLeg } from '@/libs/types/Flight/Flight.type';
import { createContext, useContext } from 'react';

const TicketCardLegContext = createContext<{ leg: FlightLeg } | null>(null);

export function useTicketCardLegContext() {
  const context = useContext(TicketCardLegContext);
  if (!context) {
    throw new Error('TicketCard.* component must be rendered as child of TicketCard component');
  }
  return context;
}

export default TicketCardLegContext;
