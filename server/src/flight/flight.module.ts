import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JWTGuardRegisterModule } from "../guards/jwt-auth/jwt-guard-register.module";
import { FlightController } from "./flight.controller";
import { Flight } from "./flight.model";
import { FlightService } from "./flight.service";

@Module({
  controllers: [FlightController],
  imports: [
    SequelizeModule.forFeature([Flight]),
    JWTGuardRegisterModule.register(),
  ],
  providers: [FlightService],
})
export class FlightModule {}
