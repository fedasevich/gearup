/* eslint-disable no-use-before-define */
export interface Flight {
  legs: FlightLeg[];
  tags: FlightTag[];
  search: Search;
  airlines: FlightHelperElement[];
  airports: Airport[];
  cities: City[];
  providers: Provider[];
  countries: FlightHelperElement[];
  trips: Trip[];
  fares: Fare[];
  filters: Filters;
  routeSponsors: RouteSponsor[];
  scores: { [key: string]: number };
  paymentMethods: PaymentMethod[];
  fareConditions: FareCondition[];
  faresCount: { [key: string]: number };
  promosCount: PromosCount;
  count: number;
  sponsors: any[];
}

export interface MergedFlight extends Trip, Fare {
  legs: FlightLeg[];
}

export interface FlightHelperElement {
  name: string;
  code: string;
}

export interface Airport {
  name: string;
  code: string;
  cityCode: string;
}

export interface City {
  code: string;
  name: string;
  countryCode: string;
}

export interface FareCondition {
  id: number;
  code: string;
  name: string;
}

export interface Fare {
  paymentFees: PaymentFee[];
  id: string;
  price: MaxPriceClass;
  providerCode: string;
  handoffUrl: string;
  ecpc: number;
  remainingSeatsCount: number;
  conditionIds: number[];
  legConditionIds: any[];
  refundable: boolean;
  exchangeable: boolean;
  tags: FareTag[];
  score: number;
  tripId: string;
}

export interface PaymentFee {
  paymentMethodId: number;
  currencyCode: CurrencyCode;
  amount: number;
  amountUsd: number;
  totalAmount: number;
  totalAmountUsd: number;
}

export type CurrencyCode = 'USD' | 'UAH';

export interface MaxPriceClass {
  totalAmount: number;
  totalAmountUsd: number;
  amount: number;
  amountUsd: number;
  originalAmount: number;
  originalAmountUsd: number;
  amountPerAdult: number;
  amountPerChild: number;
  amountPerInfant: number;
  taxAmount: number;
  taxAmountUsd: number;
  totalTaxAmount: number;
  totalTaxAmountUsd: number;
  currencyCode: CurrencyCode;
  paymentFeeAmountUsd: number;
  bookingFee: number;
  bookingFeeUsd: number;
  totalBookingFee: number;
  totalBookingFeeUsd: number;
}

export interface FareTag {
  id: number;
  code: string;
}

export interface Filters {
  totalPrice: StopoverDurations;
  minPrice: MaxPriceClass;
  maxPrice: MaxPriceClass;
  stops: AllianceElement[];
  airlines: AllianceElement[];
  providers: AllianceElement[];
  stopoverAirports: AllianceElement[];
  stopoverDurations: StopoverDurations;
  originAirports: AllianceElement[];
  destinationAirports: AllianceElement[];
  tripDurations: StopoverDurations;
  legs: FiltersLeg[];
  alliances: AllianceElement[];
  fareConditions: AllianceElement[];
}

export interface AllianceElement {
  code: string;
  price: MaxPriceClass;
}

export interface FiltersLeg {
  departureAirportCode: string;
  arrivalAirportCode: string;
  departureCityCode: string;
  arrivalCityCode: string;
  index: number;
  departureTimes: StopoverDurations;
  arrivalTimes: StopoverDurations;
  durations: StopoverDurations;
  stops: AllianceElement[];
  stopoverDurations: StopoverDurations;
  stopoverAirports: AllianceElement[];
  airlines: AllianceElement[];
}

export interface StopoverDurations {
  min: number;
  max: number;
}

export interface FlightLeg {
  id: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  departureAirportCode: string;
  arrivalAirportCode: string;
  airlineCodes: string[];
  stopoverAirportCodes: string[];
  allianceCodes: string[];
  stopoversCount: number;
  departureTimeMinutes: number;
  arrivalTimeMinutes: number;
  departureDateTime: string;
  arrivalDateTime: string;
  stopoverDurationMinutes: number;
  durationMinutes: number;
  overnight: boolean;
  stopoverDuration: string;
  durationDays: number;
  longStopover: boolean;
  segments: Segment[];
  operatingAirlineCodes: string[];
  stopoverCode: StopoverCode;
  shortStopover: boolean;
  earlyDeparture: boolean;
  lateArrival: boolean;
  newAircraft: boolean;
  oldAircraft: boolean;
  highlyRatedCarrier: boolean;
  score: number;
}

export interface Segment {
  durationMinutes: number;
  stopoverDurationMinutes: number;
  departureAirportCode: string;
  arrivalAirportCode: string;
  airlineCode: string;
  cabin: string;
  designatorCode: string;
  departureDateTime: string;
  arrivalDateTime: string;
  operatingAirlineCode?: string;
}

export type StopoverCode = 'ONE_STOP' | 'DIRECT' | 'MORE_THAN_ONE_STOP';

export interface PaymentMethod {
  id: number;
  name: string;
}

export interface PromosCount {
  [key: string]: unknown;
}

export interface Provider {
  code: string;
  name: string;
  type: string;
  instant: boolean;
  facilitatedBooking: boolean;
  wegoFare: boolean;
}

export interface RouteSponsor {
  priority: number;
  fare: Fare;
}

export interface Search {
  id: string;
  cabin: string;
  adultsCount: number;
  childrenCount: number;
  infantsCount: number;
  siteCode: string;
  currencyCode: CurrencyCode;
  locale: string;
  deviceType: string;
  appType: string;
  createdAt: Date;
  key: string;
  userCountryCode: string;
  wgInternalCampaign: string;
  legs: SearchLeg[];
  nearbyRoutes: any[];
}

export interface SearchLeg {
  id: string;
  outboundDate: Date;
  departureAirportCode: string;
  arrivalCityCode: string;
  departureCity: ArrivalCityClass;
  arrivalCity: ArrivalCityClass;
  departureAirport: Airport;
}

export interface ArrivalCityClass {
  code: string;
  name: string;
  enName: string;
  countryCode: string;
  countryName: string;
  countryEnName: string;
  worldRegionCode: string;
  worldRegionName: string;
  worldRegionEnName: string;
}

export interface FlightTag {
  id: number;
  code: string;
  name: string;
  type: string;
  price: TagPrice;
}

export interface TagPrice {
  totalAmount: number;
  totalAmountUsd: number;
  currencyCode: CurrencyCode;
}

export interface Trip {
  id: string;
  originalFlightId: string;
  code: string;
  legIds: string[];
  normalizedFlight: boolean;
}
