import { Airport } from '@/libs/types/Airport/Airport.type';
import { api } from '../../api';

export const airportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    airportAutocomplete: builder.query<Airport[], string>({
      query: (query) => ({
        url: `/airport/autocomplete`,
        params: { query }
      })
    })
  })
});
