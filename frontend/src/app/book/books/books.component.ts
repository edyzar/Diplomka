import {Component, OnInit} from '@angular/core';
import {BookService} from "../../service/book.service";
import {Book} from "../../model/book.model";
import {HttpErrorResponse} from "@angular/common/http";
import {NgToastService} from "ng-angular-popup";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [BookService]
})
export class BooksComponent implements OnInit {

  books: Book[] = [];

  isAdmin: boolean = false;

  constructor(private bookService: BookService, private toastService: NgToastService, private loginService: LoginService) {
    bookService.findAllBooks().subscribe({
      next: (it: Book[]) => this.books = it,
      error: (error: HttpErrorResponse) => {
        if (error.statusText === 'OK') {
          this.toastService.error({detail: "Chyba", summary: error.error.text, duration: 3000})
        } else {
          this.toastService.error({detail: "Chyba", summary: error.statusText, duration: 3000})
        }
      }
    });
  }

  ngOnInit(): void {
    this.isAdmin = this.loginService.hasAdminRole();
  }
}
