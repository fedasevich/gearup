import { Injectable } from "@nestjs/common";

import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Airport } from "./airport.model";

@Injectable()
export class AirportService {
  constructor(
    @InjectModel(Airport) private airportRepository: typeof Airport
  ) {}

  async autocomplete(query: string) {
    const suggestions = await this.airportRepository.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            code: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            icao: {
              [Op.iLike]: `%${query}%`,
            },
          },
        ],
      },
      limit: 10,
    });
    return suggestions;
  }
}
