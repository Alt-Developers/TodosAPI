import { Module } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { TokenService } from "src/services/token.service";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";

@Module({
  providers: [TodoService, PrismaService, TokenService],
  controllers: [TodoController],
  imports: [],
})
export class TodoModule {}
