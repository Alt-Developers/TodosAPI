import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { TimetableController } from "./timetables/timetable.controller";
import { TimetableModule } from "./timetables/timetable.module";

@Module({
  imports: [TimetableModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
