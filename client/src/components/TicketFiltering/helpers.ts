import { AllianceElement, Filters, FlightLeg, MaxPriceClass, MergedFlight } from '@/libs/types/Flight/Flight.type';
import { CheckedAllianceElement, FiltersState, SliderDuration } from './types';

export const getCheckboxListDefaultValues = (codeList: AllianceElement[]) =>
  codeList.map((code) => ({ ...code, checked: true }));

export const getSliderDefaultValue = (min: number, max: number) => ({
  max,
  min,
  value: { max, min }
});

export const prepareInitialFilterState = (initialFilter: Filters) => {
  return {
    ...initialFilter,
    airlines: getCheckboxListDefaultValues(initialFilter.airlines),
    stops: getCheckboxListDefaultValues(initialFilter.stops).reverse(),
    providers: getCheckboxListDefaultValues(initialFilter.providers),
    stopoverAirports: getCheckboxListDefaultValues(initialFilter.stopoverAirports),
    originAirports: getCheckboxListDefaultValues(initialFilter.originAirports),
    destinationAirports: getCheckboxListDefaultValues(initialFilter.destinationAirports),
    alliances: getCheckboxListDefaultValues(initialFilter.alliances),
    fareConditions: getCheckboxListDefaultValues(initialFilter.fareConditions),
    totalPrice: getSliderDefaultValue(initialFilter.minPrice.amount, initialFilter.maxPrice.amount),
    tripDurations: getSliderDefaultValue(initialFilter.tripDurations.min, initialFilter.tripDurations.max),
    stopoverDurations: getSliderDefaultValue(initialFilter.stopoverDurations.min, initialFilter.stopoverDurations.max)
  } as FiltersState;
};

const filterByCheckboxes = <T extends FlightLeg[] | string>(
  source: T,
  filter: CheckedAllianceElement[],
  flightLegField?: T extends FlightLeg[] ? keyof FlightLeg : never
) => {
  if (Array.isArray(source) && flightLegField) {
    return filter.some((filter) => {
      return source.some((field) => {
        const selectedField = field[flightLegField];

        if (Array.isArray(selectedField)) {
          if (!selectedField.length) return true;
          return (selectedField as string[]).some((value) => filter.checked && filter.code === value);
        }
        return filter.checked && filter.code === selectedField;
      });
    });
  }

  if (typeof source === 'string') {
    return filter.some((filter) => filter.checked && source === filter.code);
  }

  return false;
};

const filterBySlider = <T extends FlightLeg[] | MaxPriceClass>(
  source: T,
  filter: SliderDuration,
  flightLegField?: T extends FlightLeg[] ? keyof FlightLeg : never
) => {
  if (Array.isArray(source) && flightLegField) {
    const total = source.reduce((acc, field) => {
      const selectedField = field[flightLegField] as number;

      return acc + selectedField;
    }, 0);
    const { min, max } = filter.value;

    return total >= min && total <= max;
  }

  if (!Array.isArray(source)) {
    const { min, max } = filter.value;

    return source.amount >= min && source.amount <= max;
  }

  return false;
};

const filterFlightCriteria = (flight: MergedFlight, filter: FiltersState) => {
  return (
    filterByCheckboxes(flight.legs, filter.airlines, 'airlineCodes') &&
    filterBySlider(flight.price, filter.totalPrice) &&
    filterByCheckboxes(flight.legs, filter.originAirports, 'departureAirportCode') &&
    filterByCheckboxes(flight.legs, filter.destinationAirports, 'arrivalAirportCode') &&
    filterBySlider(flight.legs, filter.tripDurations, 'durationMinutes') &&
    filterByCheckboxes(flight.legs, filter.stopoverAirports, 'stopoverAirportCodes') &&
    filterByCheckboxes(flight.legs, filter.stops, 'stopoverCode') &&
    filterBySlider(flight.legs, filter.stopoverDurations, 'stopoverDurationMinutes') &&
    filterByCheckboxes(flight.providerCode, filter.providers)
  );
};

export const applyFilters = (filter: FiltersState | null, flights: MergedFlight[]) => {
  if (!filter) return flights;

  return flights.filter((flight) => filterFlightCriteria(flight, filter));
};

export const formatSliderHoursLabel = (value: number): string => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export const formatSliderPriceLabel = (value: number): string => {
  return `${value}$`;
};
