import { ObjectId } from "mongoose";

export interface TimetableInterface {
  classNo: string;
  year: string;
  program: string;
  school: string;
  color: string;
  timetableContent: TimetableContentInterface;
  createdBy: ObjectId;
}

export interface TimetableContentInterface extends Object {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
}
