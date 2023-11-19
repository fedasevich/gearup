import { FiltersState } from './types';

export const ticketFilterFieldToUkrainianName: { [K in keyof FiltersState]: string } = {
  minPrice: 'Мінімальна ціна',
  maxPrice: 'Максимальна ціна',
  stops: 'Зупинки',
  airlines: 'Авіакомпанії',
  providers: 'Постачальники',
  stopoverAirports: 'Аеропорти пересадок',
  stopoverDurations: 'Тривалість пересадок',
  originAirports: 'Аеропорти відправлення',
  destinationAirports: 'Аеропорти призначення',
  tripDurations: 'Тривалість подорожі',
  legs: 'Льоти',
  alliances: 'Альянси',
  fareConditions: 'Умови тарифу',
  totalPrice: 'Ціна'
};

export const ticketFilterFieldToReduxField: { [key: string]: 'airlines' | 'airports' | 'stops' } = {
  airlines: 'airlines',
  stopoverAirports: 'airports',
  stopoverDurations: 'airports',
  originAirports: 'airports',
  destinationAirports: 'airports',
  stops: 'stops'
};

export type Stops = 'DIRECT' | 'ONE_STOP' | 'MORE_THAN_ONE_STOP';

export const stopsValues: { [K in Stops]: string } = {
  DIRECT: 'Прямий рейс',
  ONE_STOP: '1 пересадка',
  MORE_THAN_ONE_STOP: 'Більше ніж одна пересадка'
};
