import {Book} from "./book.model";

export class User {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  bookIds?: number[];
}

export class UserModel {
  user: User;
  bookDtos?: Book[];
}
