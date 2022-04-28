import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { TimetableInterface } from "./timetable.interface";

@Injectable()
export class TimetableService {
  constructor(
    @Inject("TIMETABLE_MODEL")
    private readonly timetableModel: Model<TimetableInterface>,
  ) {}

  async getTimetable(timetableId: string): Promise<TimetableInterface> {
    console.log(this.timetableModel);
    const timetable = await this.timetableModel.findById(timetableId);
    return timetable;
  }
}
