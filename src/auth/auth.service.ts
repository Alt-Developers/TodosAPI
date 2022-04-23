import env from "dotenv";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { LoginDto } from "./dto/login.dto";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { PrismaService } from "src/services/prisma.service";

const jwt = require("jsonwebtoken");

@Injectable()
export class authService {
  constructor(private readonly prisma: PrismaService) {}

  async login(body: LoginDto, ip: string): Promise<object> {
    Logger.log(`A Login request for (${body.email}) from (${ip})`);
    console.log({ body });
    return {
      token: this.generateJWT(uuidv4()),
    };
  }

  async checkToken(token: string): Promise<object> {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT);
      return decodedToken;
    } catch (err) {
      Logger.error(err.message);
      switch (err.message) {
        case "jwt expired":
          throw new ForbiddenException("token is expried");
          break;
        case "invalid token":
          throw new BadRequestException("token is invalid");
          break;
        default:
          throw new InternalServerErrorException(
            "An error has occoured while decoding the JWT",
          );
          break;
      }
    }
  }

  async getUser(token: string): Promise<object> {
    return await this.getUserFromSSAPIs(token);
  }

  private async getUserFromSSAPIs(token: string): Promise<object> {
    let userData;
    await axios
      .get("http://localhost:8000/auth/getUser", {
        headers: {
          Authorization: "api " + token,
        },
      })
      .then(({ data }) => {
        userData = data;
      })
      .catch((err) => console.log(err));

    const thisUserInSSTodo = await this.prisma.user.findFirst({
      where: { ssAccId: userData._id },
    });

    if (!thisUserInSSTodo) {
      await this.prisma.user.create({
        data: {
          id: uuidv4(),
          ssAccId: userData._id,
        },
      });
    }

    return userData;
  }

  generateJWT(uid: string) {
    // Logger.warn(`JWT SECRET = ${process.env.JWT}`);
    return jwt.sign(
      {
        // iat: new Date().getTime(),
        // iss: "TODO_API",
        // exp: new Date().getTime() + 10,
        uid: uid,
      },
      process.env.JWT,
      {
        issuer: "https://todo-api.ssdevelopers.xyz",
        expiresIn: "1s",
      },
    );
  }
}
