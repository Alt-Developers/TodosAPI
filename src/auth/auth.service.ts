import env from "dotenv";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { LoginDto } from "./dto/login.dto";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { PrismaService } from "src/services/prisma.service";
import { UserResponseInterface } from "./auth.interface";

const jwt = require("jsonwebtoken");

@Injectable()
export class authService {
  constructor(private readonly prisma: PrismaService) {}

  async checkToken(token: string): Promise<object> {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT);
      return decodedToken;
    } catch (err) {
      // Logger.error({ ...err });
      switch (err.name) {
        case "TokenExpiredError":
          throw new ForbiddenException("token is expried");
          break;
        case "JsonWebTokenError":
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

  async login(body: LoginDto): Promise<{ token: string }> {
    console.log(body);
    let user = await this.ssAuthLogin(body.email, body.pass);
    console.log(user);
    if (user.errors) throw new UnauthorizedException("User not found");
    let thisUser: User;
    thisUser = await this.prisma.user.findFirst({
      where: {
        id: user.userData.ssAccId,
      },
    });
    if (!thisUser) {
      thisUser = await this.prisma.user.create({
        data: {
          ssAccId: user.userData.ssAccId,
        },
      });
    }

    const token = jwt.sign(
      {
        uid: thisUser.id,
        iat: Date.now(),
      },
      process.env.JWT,
      {
        issuer: "https://todo.apis.ssdevelopers.xyz",
      },
    );
    return token;
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

    console.log(userData);
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

  private async ssAuthLogin(
    email: string,
    password: string,
  ): Promise<UserResponseInterface> {
    let userData: any;
    let errors: any;
    await axios
      .post("http://localhost:8000/auth/login", {
        email: email,
        pass: password,
      })
      .then(({ data }) => {
        userData = data;
      })
      .catch(({ response }) => {
        errors = response.data;
      });
    return { userData, errors };
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
        expiresIn: "1d",
      },
    );
  }
}
