import { IsString } from "class-validator";

export class GetOnewayFlightDto {
  @IsString()
  from: string;
  @IsString()
  to: string;
  @IsString()
  departureDate: string;
  @IsString()
  numberOfAdults: string;
  @IsString()
  numberOfChildrens: string;
  @IsString()
  numberOfInfants: string;
  @IsString()
  cabinClass: string;
  @IsString()
  currency: string;
}
