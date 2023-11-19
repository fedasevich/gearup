import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import axios from "axios";
import { JwtAuthGuard } from "../guards/jwt-auth/jwt-auth.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/users.model";
import { AuthService } from "./auth.service";
import { TokenResponseDto } from "./dto/token.dto";

interface ExchangeRatesResponse {
  data: {
    currency: string;
    rates: {
      [symbol: string]: string;
    };
  };
}

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Login in the system" })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  @Post("/sign-in")
  signIn(@Body() userDto: CreateUserDto) {
    return this.authService.signIn(userDto);
  }

  @ApiOperation({ summary: "Registration in the system" })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  @Post("/sign-up")
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }

  @ApiOperation({ summary: "Validating token" })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get("/check")
  check(@Req() req: TokenResponseDto & Request & { user: User }) {
    return this.authService.checkToken(req);
  }

  @Get("/currency/:currency")
  async getCurrency(@Param("currency") currency: number) {
    console.log(currency);
    const rate = await axios
      .get<ExchangeRatesResponse>(
        `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
      )
      .then((response) => ({ rate: 1 / Number(response.data.data.rates.USD) }))
      .catch((error) => {
        console.error(error);
        throw error;
      });
    return rate;
  }
}
