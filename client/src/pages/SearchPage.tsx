import { TicketCard } from '@/components/TicketCard/TicketCard';
import { useMergedTicketsData } from '@/components/TicketCard/useMergedTicketsData';
import { TicketFiltering } from '@/components/TicketFiltering/TicketFiltering';
import { applyFilters, prepareInitialFilterState } from '@/components/TicketFiltering/helpers';
import { TicketSearchFormData } from '@/components/TicketSearchBar/TicketSearch';
import { MAIN_ROUTE } from '@/libs/constants/routes';
import { useAppDispatch, useAppSelector } from '@/libs/hooks/redux';
import { setAirlines, setAirports, setFilter, setSearchData, setStops } from '@/store/reducers/SearchSlice';
import { flightApi } from '@/store/reducers/flight/FlightApi';
import { format } from 'date-fns';
import { useEffect, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function SearchPage() {
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  const filter = useAppSelector((state) => state.searchReducer.filter);
  const searchData = useAppSelector((state) => state.searchReducer.searchData);
  const [oneWayQuery, { isLoading: oneWayLoading }] = flightApi.useLazyOneWayQuery();
  const [roundTripQuery, { isLoading: roundTripLoading }] = flightApi.useLazyRoundTripQuery();

  if (state === null) {
    return <Navigate to={MAIN_ROUTE} />;
  }

  const { departureDate, arrivalDate } = state as TicketSearchFormData;

  console.log(departureDate);

  useEffect(() => {
    const baseRequestData = {
      ...state,
      departureDate: format(departureDate, 'yyyy-mm-dd'),
      currency: 'UAH'
    };

    if (arrivalDate) {
      const requestData = {
        ...baseRequestData,
        arrivalDate: format(arrivalDate, 'yyyy-mm-dd')
      };
      roundTripQuery(requestData);
    } else {
      oneWayQuery(baseRequestData)
        .unwrap()
        .then((data) => {
          dispatch(setFilter(prepareInitialFilterState(data.filters)));
          dispatch(setSearchData(useMergedTicketsData(data).mergedData));
          dispatch(setAirlines(data.airlines));
          dispatch(setAirports(data.airports));
          dispatch(setStops(data.filters.stops));
        });
    }
  }, []);

  const isLoading = oneWayLoading || roundTripLoading;

  const filteredSearchData = useMemo(() => applyFilters(filter, searchData), [filter]);

  if (isLoading) {
    return 'loading';
  }

  return (
    <div className="mb-4 mt-10 flex items-center justify-center">
      <div className="2 px-4 md:w-10/12 md:px-0 lg:w-11/12 xl:w-10/12 2xl:w-3/4">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-4">
          {isLoading && 'loading'}
          <div className="w-3/12">
            <TicketFiltering />
          </div>
          <div className="w-9/12 ">
            {filteredSearchData.map((ticket) => (
              <TicketCard ticket={ticket} key={ticket.id} />
            ))}
            {!filteredSearchData.length && (
              <div className="flex w-full flex-col items-center justify-center">
                <div className=" flex w-1/2 flex-col items-center text-center">
                  <img
                    src="https://assets.wego.com/image/upload/c_fit,f_auto,fl_lossy,q_auto:low,w_192,h_192/v1584411473/web/no-results.png"
                    alt="Нічого не було знайдено"
                    className="mb-3 w-28"
                  />
                  <h4 className="text-2xl font-bold">Не знайдено жодного результату</h4>
                  <p>Вибачте, немає результатів, що відповідають вашим фільтрам. Спробуйте увімкнути один з них.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
