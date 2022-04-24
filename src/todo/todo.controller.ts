import { Body, Controller, Get, Post, Headers } from "@nestjs/common";
import { createListDto } from "./dto/createList.dto";
import { NewTodoItemDto } from "./dto/newTodoItem.dto";
import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController {
  constructor(private readonly TodoService: TodoService) {}

  @Get()
  index() {
    return "you have reached todo modules of todo API please choose service to use.";
  }

  @Post("newList")
  async newList(
    @Body() body: createListDto,
    @Headers("Authorization") token: string,
  ): Promise<object> {
    return this.TodoService.createList(token, body);
  }

  @Post("newTodoItem")
  async newTodoItem(
    @Body() body: NewTodoItemDto,
    @Headers("Authorization") token: string,
  ): Promise<object> {
    return this.TodoService.newTodoItem(token, body);
  }
}
