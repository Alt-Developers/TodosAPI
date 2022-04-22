const env = require("dotenv");
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import e from "express";
const path = require("path");

env.config({ path: "./.env" });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ["https://apis.ssdevelopers.xyz"],
    },
  });
  app
    .useGlobalPipes
    // new ValidationPipe({
    //   whitelist: true,
    // }),
    ();
  const port: string | number = process.env.PORT || 8000;
  await app.listen(port);
  Logger.log(`Started Listening at port (${process.env.PORT})`);
}
bootstrap();
