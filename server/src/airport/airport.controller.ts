import { Controller, Get, Query } from "@nestjs/common";
import { AirportService } from "./airport.service";

@Controller("airport")
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Get("autocomplete")
  async autocomplete(@Query("query") query: number) {
    const suggestions = await this.airportService.autocomplete(
      query.toString()
    );
    return suggestions;
  }
}
