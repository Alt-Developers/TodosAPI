import env from "dotenv";
import { Injectable, Logger } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { LoginDto } from "./dto/login.dto";
const jwt = require("jsonwebtoken");
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class authService {
  async login(body: LoginDto, ip: string): Promise<object> {
    Logger.log(`A Login request for (${body.email}) from (${ip})`);
    console.log({ body });
    // this.prisma.

    return {
      token: this.generateJWT(uuidv4()),
    };
  }

  generateJWT(uid: string) {
    Logger.warn(`JWT SECRET = ${process.env.JWT}`);
    return jwt.sign(
      {
        iat: new Date().getTime(),
        iss: "TODO_API",
        exp: new Date().getTime() + 10000,
        uid: uid,
      },
      process.env.JWT,
    );
  }
}
