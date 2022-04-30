import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {User, UserModel} from "../../model/user.model";
import {ActivatedRoute} from "@angular/router";
import {Book} from "../../model/book.model";
import {BookService} from "../../service/book.service";
import {map} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-user-detail',
  templateUrl: './detail-user.component.html',
  providers: [BookService, UserService]
})
export class DetailUserComponent implements OnInit {

  userModel: UserModel;
  userBooks: Book[] = []
  dialogBooks: Book[] = []
  book: Book | undefined;
  bookDialog: boolean = false;
  submitted: boolean;
  isSaveBookDisabled: boolean = true;
  isSaveDetailDisabled: boolean = true;

  readonly fg: FormGroup;
  readonly fgBook: FormGroup;

  readonly firstNameCtrl = new FormControl(null, Validators.required);
  readonly lastNameCtrl = new FormControl(null, Validators.required);
  readonly emailCtrl = new FormControl(null, Validators.required);
  readonly cityCtrl = new FormControl(null, Validators.required);

  readonly nameCtrl = new FormControl();
  readonly authorCtrl = new FormControl({value: null, disabled: true}, Validators.required);
  readonly pagesCtrl = new FormControl({value: null, disabled: true}, Validators.required);
  readonly publishedCtrl = new FormControl({value: null, disabled: true}, Validators.required);

  constructor(readonly userService: UserService, private activatedRoute: ActivatedRoute,
              private bookService: BookService, private cdr: ChangeDetectorRef, private toastService: NgToastService) {
    this.fg = new FormGroup({
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      email: this.emailCtrl,
      city: this.cityCtrl
    });

    this.fgBook = new FormGroup({
      name: this.nameCtrl,
      author: this.authorCtrl,
      pages: this.pagesCtrl,
      published: this.publishedCtrl
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.userService.userWithBooksDetail(id).subscribe(
      data => {
        this.userModel = data;


        if (this.userModel.bookDtos !== undefined) {
          this.userBooks = this.userModel.bookDtos;
        }

        this.firstNameCtrl.setValue(this.userModel.user.firstName);
        this.lastNameCtrl.setValue(this.userModel.user.lastName);
        this.emailCtrl.setValue(this.userModel.user.email);
        this.cityCtrl.setValue(this.userModel.user.city);
      }
    );

    this.firstNameCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.lastNameCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.emailCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.cityCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.nameCtrl.valueChanges.subscribe(() => this.isSaveBookDisabled = false);
  }

  saveUser() {
    const user: User = this.setUser();

    this.userBooks.map(it => {
      if (it.bookId) {
        user.bookIds?.push(it.bookId);
      }
    })

    this.userService.saveUser(user).subscribe({
      next: () => this.toastService.success({
        detail: "Informace",
        summary: "Uložení proběhlo v pořádku",
        duration: 3000
      }),
      error: (error: HttpErrorResponse) => this.toastService.error({
        detail: "Chyba",
        summary: error.statusText,
        duration: 3000
      })
    });
  }

  deleteBook(bookId: number) {
    let bookIds: number[] = [];
    let user: User = this.setUser();

    this.userBooks = this.userBooks.filter(book => book.bookId != bookId);

    this.userBooks.map(it => {
      if (it.bookId) {
        bookIds.push(it.bookId);
      }
    })

    user.bookIds = bookIds;
    this.userService.saveUser(user).subscribe({
      next: () => this.toastService.success({
        detail: "Informace",
        summary: "Odebrání knihy proběhlo v pořádku",
        duration: 3000
      }),
      error: (error: HttpErrorResponse) => this.toastService.error({
        detail: "Chyba",
        summary: error.statusText,
        duration: 3000
      })
    });
  }

  private setUser(): User {
    const user: User = {
      userId: this.userModel.user.userId,
      firstName: this.firstNameCtrl.value,
      lastName: this.lastNameCtrl.value,
      email: this.emailCtrl.value,
      city: this.cityCtrl.value,
      bookIds: []
    }
    return user;
  }

  closeDialog() {
    this.dialogBooks = [];
    this.bookDialog = false;
    this.cdr.detectChanges();
  }

  addBook() {
    this.book = undefined;
    this.submitted = false;
    this.bookDialog = true;

    this.bookService.findAllBooks().pipe(
      map((val: Book[]) => val.filter(id1 => !this.userModel.bookDtos?.find(id2 => id2.bookId === id1.bookId))))
      .subscribe(it => this.dialogBooks = it);

  }

  saveBook() {
    this.bookDialog = false;
    const book: Book = this.nameCtrl.value;
    const user: User = this.setUser();

    this.userBooks.map(it => {
      if (it.bookId != undefined) {
        user.bookIds?.push(it.bookId);
      }
    })

    if (book.bookId) {
      user.bookIds?.push(book.bookId);
    }

    this.userService.saveUser(user).subscribe({
      next: () => this.toastService.success({
        detail: "Informace",
        summary: "Přidání knihy proběhlo v pořádku",
        duration: 3000
      }),
      error: (error: HttpErrorResponse) => this.toastService.error({
        detail: "Chyba",
        summary: error.statusText,
        duration: 3000
      })
    });
  }

  fillDetail() {
    const book: Book = this.nameCtrl.value;
    this.authorCtrl.setValue(book.author);
    this.pagesCtrl.setValue(book.pages);
    this.publishedCtrl.setValue(book.published);
  }

  private isValidForm() {
    this.isSaveDetailDisabled = !(
      this.firstNameCtrl.value !== null && this.firstNameCtrl.value !== ''
      && this.lastNameCtrl.value !== null && this.lastNameCtrl.value !== ''
      && this.emailCtrl.value !== null && this.emailCtrl.value !== ''
      && this.cityCtrl.value !== null && this.cityCtrl.value !== ''
    );
  }

}
