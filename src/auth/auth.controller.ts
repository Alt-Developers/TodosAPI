import { Controller, Post } from '@nestjs/common';

@Controller()
export class auth {
  @Post()
  async login(): Promise<object> {
    return {};
  }
}
