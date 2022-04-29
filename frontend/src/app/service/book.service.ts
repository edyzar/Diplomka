import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {Book} from "../model/book.model";

@Injectable()
export class BookService {

  private readonly apiUrl = 'http://localhost:8083/v1/book';

  constructor(private http: HttpClient) {
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl + '/', book);
  }

  findBookById(id: number): Observable<Book> {
    return this.http.get<Book>(this.apiUrl + '/' + id);
  }

  findAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/all');
  }

  deleteBookById(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

}
