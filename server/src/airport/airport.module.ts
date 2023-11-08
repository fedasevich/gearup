import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AirportController } from "./airport.controller";
import { Airport } from "./airport.model";
import { AirportService } from "./airport.service";

@Module({
  controllers: [AirportController],
  providers: [AirportService],
  imports: [SequelizeModule.forFeature([Airport])],
})
export class AirportModule {}
