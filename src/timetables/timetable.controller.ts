import { Controller, Get, Param } from "@nestjs/common";
import { TimetableService } from "./timetable.service";

@Controller("timetable")
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Get(":id")
  async getTimetable(@Param("id") timetableId: string) {
    return await this.timetableService.getTimetable("623c5984e0ab1853923736d6");
  }
}
