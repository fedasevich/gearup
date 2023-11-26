import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { GetRoundTripFlightDto } from "./dto/get-roundtrip-flight.dto";
import { FlightService } from "./flight.service";
// import * as MOCKED_RESPONSE_ONEWAY from "./oneway.json";
import { JwtAuthGuard } from "../guards/jwt-auth/jwt-auth.guard";
import { User } from "../users/users.model";
import { GetOnewayFlightDto } from "./dto/get-oneway-flight.dto";
import { Flight } from "./flight.model";

@Controller("flight")
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get(
    "/oneway/:from/:to/:departureDate/:numberOfAdults/:numberOfChildrens/:numberOfInfants/:cabinClass"
  )
  findOneway(@Param() dto: GetOnewayFlightDto) {
    return this.flightService.findOneway(dto);
    // return MOCKED_RESPONSE_ONEWAY;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createFlight(
    @Body() flightData: object,
    @Req() req: Request & { user: User }
  ) {
    return this.flightService.createFlight(flightData, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: Request & { user: User }): Promise<Flight[]> {
    return this.flightService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  removeFlight(@Param("id") id: number, @Req() req: Request & { user: User }) {
    return this.flightService.remove(id, req);
  }

  @Get(
    "/roundtrip/:from/:to/:departureDate/:arrivalDate/:numberOfAdults/:numberOfChildrens/:numberOfInfants/:cabinClass"
  )
  findRoundTrip(@Param() dto: GetRoundTripFlightDto) {
    return this.flightService.findRoundTrip(dto);
  }
}
