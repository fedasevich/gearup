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

interface FlightOrdering extends OrderPassengersFormValues {
  state: OrderPageLocationState;
}

interface OrderedFlight {
  id: number;
  flightData: FlightOrdering;
}

export const flightApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createFlight: builder.mutation<OrderedFlight, FlightOrdering>({
      query: (body) => ({
        url: '/flight',
        method: 'POST',
        body
      }),
      invalidatesTags: ['UserFlights']
    }),
    deleteFlight: builder.mutation<number, number>({
      query: (param) => ({
        url: `/flight/${param}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['UserFlights']
    }),
    getAll: builder.query<OrderedFlight[], void>({
      query: () => ({
        url: `/flight`
      }),
      providesTags: ['UserFlights']
    }),
    oneWay: builder.query<Flight, OneWayParams>({
      query: ({ from, to, departureDate, numberOfAdults, numberOfChildrens, numberOfInfants, cabinClass }) => ({
        url: `/flight/oneway/${from.toUpperCase()}/${to.toUpperCase()}/${departureDate}/${numberOfAdults}/${numberOfChildrens}/${numberOfInfants}/${cabinClass}`
      })
    }),
    // oneWay: builder.query<Flight, unknown>({
    //   query: () => ({
    //     url: `/flight/oneway`
    //   })
    // }),
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
