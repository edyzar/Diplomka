import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopService} from "../../service/shop.service";
import {Shop, ShopModel} from "../../model/shop.model";
import {ActivatedRoute} from "@angular/router";
import {Book} from "../../model/book.model";
import {map} from "rxjs";
import {BookService} from "../../service/book.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgToastService} from "ng-angular-popup";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-detail-shop',
  templateUrl: './detail-shop.component.html',
  providers: [BookService, ShopService]
})
export class DetailShopComponent implements OnInit {

  shopModel: ShopModel;
  shopBooks: Book[] = [];
  dialogBooks: Book[] = []
  book: Book | undefined;
  bookDialog: boolean = false;
  submitted: boolean;
  isSaveBookDisabled: boolean = true;
  isSaveDetailDisabled: boolean = true;

  isAdmin: boolean = false;

  readonly fg: FormGroup;
  readonly fgBook: FormGroup;

  readonly sizeCtrl = new FormControl(null, Validators.required);
  readonly streetCtrl = new FormControl(null, Validators.required);
  readonly shopNameCtrl = new FormControl(null, Validators.required);
  readonly cityCtrl = new FormControl(null, Validators.required);
  readonly postcodeCtrl = new FormControl(null, Validators.required);
  readonly countryCtrl = new FormControl(null, Validators.required);

  readonly nameCtrl = new FormControl();
  readonly authorCtrl = new FormControl({value: null, disabled: true}, Validators.required);
  readonly pagesCtrl = new FormControl({value: null, disabled: true}, Validators.required);
  readonly publishedCtrl = new FormControl({value: null, disabled: true}, Validators.required);

  constructor(readonly shopService: ShopService, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef,
              readonly bookService: BookService, private toastService: NgToastService, private loginService: LoginService) {
    this.fg = new FormGroup({
      size: this.sizeCtrl,
      name: this.shopNameCtrl,
      street: this.streetCtrl,
      city: this.cityCtrl,
      postcode: this.postcodeCtrl,
      country: this.countryCtrl
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
    this.shopService.shopWithBooksDetail(id).subscribe(
      data => {
        this.shopModel = data;

        if (this.shopModel.bookDtos != undefined) {
          this.shopBooks = this.shopModel.bookDtos;
        }

        this.sizeCtrl.setValue(this.shopModel.shop.size);
        this.streetCtrl.setValue(this.shopModel.shop.street);
        this.shopNameCtrl.setValue(this.shopModel.shop.name);
        this.cityCtrl.setValue(this.shopModel.shop.city);
        this.postcodeCtrl.setValue(this.shopModel.shop.postcode);
        this.countryCtrl.setValue(this.shopModel.shop.country);
      }
    );

    this.nameCtrl.valueChanges.subscribe(() => {
      this.isSaveBookDisabled = false;
      this.isValidForm();
    });

    this.sizeCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.streetCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.cityCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.postcodeCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.countryCtrl.valueChanges.subscribe(() => this.isValidForm());

    this.isAdmin = this.loginService.hasAdminRole();

    if (!this.isAdmin) {
      this.shopNameCtrl.disable();
      this.sizeCtrl.disable();
      this.streetCtrl.disable();
      this.cityCtrl.disable();
      this.postcodeCtrl.disable();
      this.countryCtrl.disable();
    }
  }

  saveShop() {
    const shop: Shop = this.setShop();

    this.shopService.saveShop(shop).subscribe({
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
    let shop: Shop = this.setShop();

    this.shopBooks = this.shopBooks.filter(book => book.bookId != bookId);

    this.shopBooks.map(it => {
      if (it.bookId !== undefined) {
        bookIds.push(it.bookId);
      }
    })

    shop.bookIds = bookIds;
    this.shopService.saveShop(shop).subscribe({
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

  private setShop(): Shop {
    const shop: Shop = {
      shopId: this.shopModel.shop.shopId,
      size: this.sizeCtrl.value,
      name: this.shopNameCtrl.value,
      street: this.streetCtrl.value,
      city: this.cityCtrl.value,
      postcode: this.postcodeCtrl.value,
      country: this.countryCtrl.value,
      bookIds: []
    }
    return shop;
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
      map((val: Book[]) => val.filter(id1 => !this.shopModel.bookDtos?.find(id2 => id2.bookId === id1.bookId))))
      .subscribe(it => this.dialogBooks = it);
  }

  saveBook() {
    this.bookDialog = false;
    const book: Book = this.nameCtrl.value;
    const shop: Shop = this.setShop();

    this.shopBooks.map(it => {
      if (it.bookId != undefined) {
        shop.bookIds?.push(it.bookId);
      }
    })

    if (book.bookId) {
      shop.bookIds?.push(book.bookId);
    }

    this.shopService.saveShop(shop).subscribe({
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

  public isValidForm() {
    this.isSaveDetailDisabled = !(
      this.shopNameCtrl.value !== null && this.shopNameCtrl.value !== ''
      && this.sizeCtrl.value !== null && this.sizeCtrl.value !== ''
      && this.streetCtrl.value !== null && this.streetCtrl.value !== ''
      && this.cityCtrl.value !== null && this.cityCtrl.value !== ''
      && this.postcodeCtrl.value !== null && this.postcodeCtrl.value !== ''
      && this.countryCtrl.value !== null && this.countryCtrl.value !== ''
    );
  }
}
