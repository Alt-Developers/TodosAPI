import { Module } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { AuthController } from "./auth.controller";
import { authService } from "./auth.service";

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [authService, PrismaService],
})
export class AuthModule {}
