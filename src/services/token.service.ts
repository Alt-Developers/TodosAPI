import { Injectable } from "@nestjs/common";

const jwt = require("jsonwebtoken");

@Injectable()
export class TokenService {
  async getUser(token: string) {
    return await jwt.verify(token, process.env.JWT);
  }
}
