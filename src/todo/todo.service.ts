import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { TokenService } from "src/services/token.service";
import { v4 as uuidv4 } from "uuid";
import { createListDto } from "./dto/createList.dto";
import { NewTodoItemDto } from "./dto/newTodoItem.dto";

@Injectable()
export class TodoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async getAllTodo(token: string, listId: string): Promise<object> {
    const allTodo = await this.prisma.todoList.findFirst({
      where: {
        id: listId,
      },
      include: {
        todoItem: true,
      },
    });
    return allTodo;
  }

  async createList(token: string, body: createListDto): Promise<object> {
    const user: any = await this.tokenService.getUser(token);
    const result = await this.prisma.user.update({
      where: {
        id: user.uid,
      },
      data: {
        todoList: {
          create: {
            name: body.name,
            desc: body.desc,
          },
        },
      },
    });

    return result;
  }

  async newTodoItem(token: string, body: NewTodoItemDto): Promise<object> {
    const user: any = await this.tokenService.getUser(token);
    const result = await this.prisma.todoList.update({
      where: {
        id: body.listId,
      },
      data: {
        todoItem: {
          create: {
            name: body.name,
            desc: body.desc,
            due: new Date(body.due),
          },
        },
      },
    });

    return result;
  }
}
