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
import { Flight } from "./flight.model";
import * as MOCKED_RESPONSE_ONEWAY from "./multiTrip.json";

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
    console.log(dto);
    return this.flightService.findRoundTrip();
  }
}
