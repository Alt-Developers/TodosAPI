import {
  Body,
  Controller,
  Get,
  Ip,
  Logger,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('req-me')
  async getSomething(
    @Req() req: Request,
    @Ip() ip: string,
    @Query('hello') query: string | object,
  ): Promise<object> {
    console.log({ body: req.body, ip, query });
    return { message: 'Heloo' };
  }
}
