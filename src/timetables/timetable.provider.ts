import { Connection } from "mongoose";
import mongoose from "mongoose";
import { timetableSchema } from "./timetable.schema";

export const timetableProviders = [
  {
    provide: "TIMETABLE_MODEL",
    useFactory: (connection: Connection) => {
      mongoose.connection
        .useDb("timetables")
        .model("timetables", timetableSchema);
    },
    inject: ["DATABASE_CONNECTION"],
  },
];
