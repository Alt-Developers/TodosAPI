import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Ip,
  Logger,
  Post,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import { authService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: authService) {}

  @Post("login")
  async login(
    @Body() LoginDto: LoginDto,
    @Ip() ip: string,
    @Req() req: Request,
  ): Promise<object> {
    return this.authService.login(LoginDto, ip);
  }

  @Get("getUser")
  async getUser(@Headers("Authorization") token: string): Promise<object> {
    return await this.authService.getUser(token);
  }

  @Get("checkToken")
  async checkToken(@Headers("Authorization") token) {
    return this.authService.checkToken(token);
  }
}
