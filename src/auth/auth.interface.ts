export interface User {
  fName: string;
  lName: string;
  email: string;
  password: string;
  createdAt: Date;
  todoList?: any[];
}

export interface UserResponseInterface {
  userData: {
    ssAccId: string;
    userInfo: {
      fName: string;
      lName: string;
      color: string;
      email: string;
      profile: string;
    };
  };
  errors: any;
}
