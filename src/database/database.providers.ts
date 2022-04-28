import { Injectable } from "@nestjs/common";
import * as mongoose from "mongoose";

export const databaseProvider = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: async (): Promise<typeof mongoose> => {
      return await mongoose.connect(
        "mongodb+srv://api:rQJ2H3ze3VTfwlef@cluster0.ncvvz.mongodb.net/",
      );
    },
  },
];
