import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Flight } from "./flight.model";

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight)
    private readonly flightModel: typeof Flight
  ) {}
  findOneway() {
    return `This action returns all flight`;
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

  findRoundTrip() {
    return `This action returns a  flight`;
  }
}
