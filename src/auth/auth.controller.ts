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
  async getUser(@Body() LoginDto: LoginDto, @Ip() ip: string): Promise<object> {
    console.log(LoginDto);
    return this.authService.login(LoginDto, ip);
  }

  @Post()
  async login(): Promise<object> {
    return {};
  }
}
