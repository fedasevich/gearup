import { Injectable } from "@nestjs/common";

@Injectable()
export class FlightService {
  findOneway() {
    return `This action returns all flight`;
  }

  findRoundTrip() {
    return `This action returns a  flight`;
  }
}
