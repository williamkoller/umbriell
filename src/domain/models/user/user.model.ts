export class UserModel {
  id: number;
  name: string;
  surname: string;
  age: number;
  active?: boolean;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
