import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { authService } from "./auth.service";

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [authService],
})
export class AuthModule {}
