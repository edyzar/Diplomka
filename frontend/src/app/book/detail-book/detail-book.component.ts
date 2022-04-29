import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BookService} from "../../service/book.service";
import {Book} from "../../model/book.model";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {NgToastService} from "ng-angular-popup";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  providers: [BookService]
})
export class DetailBookComponent implements OnInit {

  book: Book;
  isSaveDisabled: boolean = true;
  isAdmin: boolean = false;

  readonly fg: FormGroup;

  readonly nameCtrl = new FormControl();
  readonly authorCtrl = new FormControl();
  readonly pagesCtrl = new FormControl();
  readonly publishedCtrl = new FormControl();

  constructor(readonly bookService: BookService, private acitvatedRoute: ActivatedRoute,
              private router: Router, private toastService: NgToastService, private loginService: LoginService) {
    this.fg = new FormGroup({
      name: this.nameCtrl,
      author: this.authorCtrl,
      pages: this.pagesCtrl,
      published: this.publishedCtrl
    });
  }

  ngOnInit(): void {
    const id = this.acitvatedRoute.snapshot.params['id'];
    this.bookService.findBookById(id).subscribe(
      data => {
        this.book = data;
        this.nameCtrl.setValue(this.book.name);
        this.authorCtrl.setValue(this.book.author);
        this.pagesCtrl.setValue(this.book.pages);
        this.publishedCtrl.setValue(this.book.published);
      }
    );

    this.nameCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.authorCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.pagesCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.publishedCtrl.valueChanges.subscribe(() => this.isValidForm());

    this.isAdmin = this.loginService.hasAdminRole();

    if (!this.isAdmin) {
      this.nameCtrl.disable();
      this.authorCtrl.disable();
      this.pagesCtrl.disable();
      this.publishedCtrl.disable();
    }
  }

  saveBook() {
    const book: Book = {
      bookId: this.book.bookId,
      name: this.nameCtrl.value,
      author: this.authorCtrl.value,
      pages: this.pagesCtrl.value,
      published: this.publishedCtrl.value
    }

    this.bookService.saveBook(book).subscribe({
      next: () => {
        this.toastService.success({detail: "Informace", summary: "Uložení proběhlo v pořádku", duration: 3000});
      },
      error: (error: HttpErrorResponse) => this.toastService.error({
        detail: "Chyba",
        summary: error.statusText,
        duration: 3000
      })
    });
  }

  private isValidForm() {
    this.isSaveDisabled = !(
      this.nameCtrl.value !== null && this.nameCtrl.value !== ''
      && this.authorCtrl.value !== null && this.authorCtrl.value !== ''
      && this.pagesCtrl.value !== null && this.pagesCtrl.value !== ''
      && this.publishedCtrl.value !== null && this.publishedCtrl.value !== ''
    );
  }

}
