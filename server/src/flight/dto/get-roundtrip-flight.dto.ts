import { IsString } from "class-validator";

export class GetRoundTripFlightDto {
  @IsString()
  from: string;
  @IsString()
  to: string;
  @IsString()
  departureDate: string;
  @IsString()
  arrivalDate: string;
  @IsString()
  numberOfAdults: string;
  @IsString()
  numberOfChildrens: string;
  @IsString()
  numberOfInfants: string;
  @IsString()
  cabinClass: string;
}
