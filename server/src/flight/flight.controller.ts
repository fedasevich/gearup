import { Controller, Get, Param } from "@nestjs/common";
import { GetRoundTripFlightDto } from "./dto/get-roundtrip-flight.dto";
import { FlightService } from "./flight.service";
import * as MOCKED_RESPONSE_ONEWAY from "./oneway.json";

@Controller("flight")
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  // @Get(
  //   "/oneway/:from/:to/:departureDate/:numberOfAdults/:numberOfChildrens/:numberOfInfants/:cabinClass"
  // )
  // findOneway(@Param() dto: GetOnewayFlightDto) {
  //   console.log(dto);
  //   return this.flightService.findOneway();
  // }
  @Get("/oneway")
  async findOneway() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return MOCKED_RESPONSE_ONEWAY;
  }

  @Get(
    "/roundtrip/:from/:to/:departureDate/:arrivalDate/:numberOfAdults/:numberOfChildrens/:numberOfInfants/:cabinClass"
  )
  findRoundTrip(@Param() dto: GetRoundTripFlightDto) {
    console.log(dto);
    return this.flightService.findRoundTrip();
  }
}
