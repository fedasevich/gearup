import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/sequelize";
import axios from "axios";
import { User } from "../users/users.model";
import { GetOnewayFlightDto } from "./dto/get-oneway-flight.dto";
import { GetRoundTripFlightDto } from "./dto/get-roundtrip-flight.dto";
import { Flight } from "./flight.model";

@Injectable()
export class FlightService {
  private readonly flightApiKey =
    this.configService.get<string>("FLIGHT_API_KEY");
  constructor(
    @InjectModel(Flight)
    private readonly flightModel: typeof Flight,
    private readonly configService: ConfigService
  ) {}

  async findOneway(dto: GetOnewayFlightDto) {
    console.log(dto);
    const result = await axios
      .get<{ data: object }>(
        `https://api.flightapi.io/onewaytrip/${this.flightApiKey}/${dto.from}/${dto.to}/${dto.departureDate}/${dto.numberOfAdults}/${dto.numberOfChildrens}/${dto.numberOfInfants}/${dto.cabinClass}/USD`,
        {
          params: dto,
        }
      )
      .catch((error) => console.log(error));
    return (result as { data: object }).data;
  }

  createFlight(data: object, req: Request & { user: User }): Promise<Flight> {
    const userId = req.user.id as number;
    return this.flightModel.create({ flightData: data, userId });
  }

  findAll(req: Request & { user: User }): Promise<Flight[]> {
    const userId = req.user.id as number;
    return this.flightModel.findAll({ where: { userId } });
  }

  async remove(id: number, req: Request & { user: User }): Promise<number> {
    const userId = req.user.id as number;

    const result = await this.flightModel.destroy({ where: { id, userId } });
    return result;
  }

  async findRoundTrip(dto: GetRoundTripFlightDto) {
    const result = await axios
      .get<{ data: object }>(
        `https://api.flightapi.io/roundtrip/${this.flightApiKey}/${dto.from}/${dto.to}/${dto.departureDate}/${dto.arrivalDate}/${dto.numberOfAdults}/${dto.numberOfChildrens}/${dto.numberOfInfants}/${dto.cabinClass}/USD`,
        {
          params: dto,
        }
      )
      .catch((error) => console.log(error));
    return (result as { data: object }).data;
  }
}
