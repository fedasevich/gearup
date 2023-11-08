import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { SequelizeModule } from "@nestjs/sequelize";
import pg from "pg";
import { Airport } from "./airport/airport.model";
import { AirportModule } from "./airport/airport.module";
import { AuthModule } from "./auth/auth.module";
import { ResetPasswordModule } from "./auth/reset-password/reset-password.module";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { LinkTypeModule } from "./links/link-types/linkType.module";
import { LinkModule } from "./links/link.module";
import { ProfileModule } from "./profile/profile.module";
import { UsersModule } from "./users/users.module";

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
      isGlobal: true,
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, "..", "/src/", "static"),
    //   serveRoot: "/static",
    // }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Airport],
      autoLoadModels: true,
      dialectModule: pg,
      // dialectOptions: {
      //   ssl: {
      //     require: true,
      //     rejectUnauthorized: false,
      //   },
      // },
    }),
    UsersModule,
    AuthModule,
    ResetPasswordModule,
    ProfileModule,
    LinkModule,
    LinkTypeModule,
    AirportModule,
  ],
})
export class AppModule {}
