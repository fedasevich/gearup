import { Fare, Flight, FlightLeg, MergedFlight } from '@/libs/types/Flight/Flight.type';

interface HookReturn {
  mergedData: MergedFlight[];
}

export function useMergedTicketsData(data: Flight): HookReturn {
  const legsMap = new Map<string, FlightLeg>();
  data.legs.forEach((leg) => {
    legsMap.set(leg.id, leg);
  });

  const faresMap = new Map<string, Fare>();
  data.fares.forEach((fare) => {
    faresMap.set(fare.tripId, fare);
  });

  const mergedData = data.trips.map((trip) => {
    const tripFare = faresMap.get(trip.id) as Fare;
    const legs = trip.legIds.map((leg) => legsMap.get(leg)) as FlightLeg[];
    return { ...trip, ...tripFare, legs };
  });

  mergedData.sort((a, b) => b.score - a.score);

  return { mergedData };
}
