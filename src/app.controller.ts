import {
  Body,
  Controller,
  Get,
  Ip,
  Logger,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("echo")
  async getSomething(@Body() body): Promise<object> {
    return { echoedBody: body };
  }
}
