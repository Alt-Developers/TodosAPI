export interface User {
  fName: string;
  lName: string;
  email: string;
  password: string;
  createdAt: Date;
  todoList?: any[];
}
