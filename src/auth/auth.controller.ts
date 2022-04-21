import {
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Ip,
  Logger,
  Post,
  Req,
} from "@nestjs/common";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  @Get()
  async getUser(
    @Req() req: Request,
    @Ip() ip: string,
    @Headers("authorization") auth,
  ): Promise<object> {
    const token = req.headers.authorization;
    Logger.log(`token are: ${token} and ${auth}`);
    throw new HttpException(
      "You are forbidden from this endpoint, sorry for the inconvinent",
      HttpStatus.FORBIDDEN,
    );
    return {
      user: "This is a user",
    };
  }

  @Post()
  async login(): Promise<object> {
    return {};
  }
}
