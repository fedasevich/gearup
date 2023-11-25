import { Flight } from '@/libs/types/Flight/Flight.type';
import { OrderPageLocationState, OrderPassengersFormValues } from '@/pages/OrderPage';
import { api } from '../../api';

interface OneWayParams {
  from: string;
  to: string;
  departureDate: string;
  numberOfAdults: number;
  numberOfChildrens: number;
  numberOfInfants: number;
  cabinClass: string;
}

interface RoundTripParams extends OneWayParams {
  arrivalDate: string;
}

interface OrderedFlight extends OrderPassengersFormValues {
  state: OrderPageLocationState;
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
    //   }) => ({
    //     url: `/flight/oneway/${from.toUpperCase()}/${to.toUpperCase()}/${departureDate}/${numberOfAdults}/${numberOfChildrens}/${numberOfInfants}/${cabinClass}}`
    //   })
    // }),
    createFlight: builder.mutation<OrderedFlight, OrderedFlight>({
      query: (body) => ({
        url: '/flight',
        method: 'POST',
        body
      })
    }),
    deleteFlight: builder.mutation<number, number>({
      query: (param) => ({
        url: `/flight/${param}`,
        method: 'DELETE'
      })
    }),
    getAll: builder.query<OrderedFlight[], unknown>({
      query: () => ({
        url: `/flight`
      })
    }),
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
        cabinClass
      }) => ({
        url: `/flight/roundtrip/${from.toUpperCase()}/${to.toUpperCase()}/${departureDate}/${arrivalDate}/${numberOfAdults}/${numberOfChildrens}/${numberOfInfants}/${cabinClass}`
      })
    })
  })
});
