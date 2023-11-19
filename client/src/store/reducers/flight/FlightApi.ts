import { Flight } from '@/libs/types/Flight/Flight.type';
import { api } from '../../api';

interface OneWayParams {
  from: string;
  to: string;
  departureDate: string;
  numberOfAdults: number;
  numberOfChildrens: number;
  numberOfInfants: number;
  cabinClass: string;
  currency: string;
}

interface RoundTripParams extends OneWayParams {
  arrivalDate: string;
}

export const flightApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // oneWay: builder.query<string, OneWayParams>({
    //   query: ({
    //     from,
    //     to,
    //     departureDate,
    //     numberOfAdults,
    //     numberOfChildrens,
    //     numberOfInfants,
    //     cabinClass,
    //     currency
    //   }) => ({
    //     url: `/flight/oneway/${from.toUpperCase()}/${to.toUpperCase()}/${departureDate}/${numberOfAdults}/${numberOfChildrens}/${numberOfInfants}/${cabinClass}/${currency}`
    //   })
    // }),
    oneWay: builder.query<Flight, unknown>({
      query: () => ({
        url: `/flight/oneway`
      })
    }),
    roundTrip: builder.query<Flight, RoundTripParams>({
      query: ({
        from,
        to,
        departureDate,
        arrivalDate,
        numberOfAdults,
        numberOfChildrens,
        numberOfInfants,
        cabinClass,
        currency
      }) => ({
        url: `/flight/roundtrip/${from.toUpperCase()}/${to.toUpperCase()}/${departureDate}/${arrivalDate}/${numberOfAdults}/${numberOfChildrens}/${numberOfInfants}/${cabinClass}/${currency}`
      })
    })
  })
});
