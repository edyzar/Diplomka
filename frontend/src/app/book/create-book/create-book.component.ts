import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../model/book.model";
import {BookService} from "../../service/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  providers: [BookService]
})
export class CreateBookComponent implements OnInit {

  isSaveDisabled: boolean = true;

  readonly fg: FormGroup;

  readonly nameCtrl = new FormControl(null, Validators.required);
  readonly authorCtrl = new FormControl(null, Validators.required);
  readonly pagesCtrl = new FormControl(null, Validators.required);
  readonly publishedCtrl = new FormControl(null, Validators.required);

  constructor(readonly bookService: BookService, private router: Router, private toastService: NgToastService) {
    this.fg = new FormGroup({
      name: this.nameCtrl,
      author: this.authorCtrl,
      pages: this.pagesCtrl,
      published: this.publishedCtrl
    });
  }

  ngOnInit() {
    this.nameCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.authorCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.pagesCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.publishedCtrl.valueChanges.subscribe(() => this.isValidForm());
  }

  saveBook() {
    const book: Book = {
      name: this.nameCtrl.value,
      author: this.authorCtrl.value,
      pages: this.pagesCtrl.value,
      published: this.publishedCtrl.value
    }

    this.bookService.saveBook(book).subscribe({
      next: () => {
        this.toastService.success({detail: "Informace", summary: "Uložení proběhlo v pořádku", duration: 3000});
        this.router.navigate(['books']);
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
