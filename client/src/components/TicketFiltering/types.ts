import { AllianceElement, FiltersLeg, MaxPriceClass, StopoverDurations } from '@/libs/types/Flight/Flight.type';

export interface CheckedAllianceElement extends AllianceElement {
  checked: boolean;
}

export interface SliderDuration extends StopoverDurations {
  value: StopoverDurations;
}

export interface FiltersState {
  totalPrice: SliderDuration;
  minPrice: MaxPriceClass;
  maxPrice: MaxPriceClass;
  stops: CheckedAllianceElement[];
  airlines: CheckedAllianceElement[];
  providers: CheckedAllianceElement[];
  stopoverAirports: CheckedAllianceElement[];
  stopoverDurations: SliderDuration;
  originAirports: CheckedAllianceElement[];
  destinationAirports: CheckedAllianceElement[];
  tripDurations: SliderDuration;
  legs: FiltersLeg[];
  alliances: CheckedAllianceElement[];
  fareConditions: CheckedAllianceElement[];
}
