import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User, UserModel} from "../model/user.model";
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  private readonly apiUrl = 'http://localhost:8083/v1/user';

  constructor(private http: HttpClient) {
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/', user);
  }

  userWithBooksDetail(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(this.apiUrl + '/detail/' + id);
  }

  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/all');
  }

  deleteUserById(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

}
