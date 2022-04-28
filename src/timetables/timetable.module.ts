import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { timetableProviders } from "./timetable.provider";
import { TimetableController } from "./timetable.controller";
import { TimetableService } from "./timetable.service";

@Module({
  imports: [DatabaseModule],
  providers: [TimetableService, ...timetableProviders],
  controllers: [TimetableController],
})
export class TimetableModule {}
