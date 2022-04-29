import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopService} from "../../service/shop.service";
import {Shop} from "../../model/shop.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  providers: [ShopService]
})
export class CreateShopComponent implements OnInit {

  isSaveDisabled: boolean = true;

  readonly fg: FormGroup;

  readonly sizeCtrl = new FormControl(null, Validators.required);
  readonly streetCtrl = new FormControl(null, Validators.required);
  readonly nameCtrl = new FormControl(null, Validators.required);
  readonly cityCtrl = new FormControl(null, Validators.required);
  readonly postcodeCtrl = new FormControl(null, Validators.required);
  readonly countryCtrl = new FormControl(null, Validators.required);

  constructor(readonly shopService: ShopService, private router: Router, private toastService: NgToastService) {
    this.fg = new FormGroup({
      size: this.sizeCtrl,
      name: this.nameCtrl,
      street: this.streetCtrl,
      city: this.cityCtrl,
      postcode: this.postcodeCtrl,
      country: this.countryCtrl
    });
  }

  ngOnInit(): void {
    this.sizeCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.nameCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.streetCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.cityCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.postcodeCtrl.valueChanges.subscribe(() => this.isValidForm());
    this.countryCtrl.valueChanges.subscribe(() => this.isValidForm());
  }

  saveShop() {
    const shop: Shop = {
      size: this.sizeCtrl.value,
      name: this.nameCtrl.value,
      street: this.streetCtrl.value,
      city: this.cityCtrl.value,
      postcode: this.postcodeCtrl.value,
      country: this.countryCtrl.value
    }

    this.shopService.saveShop(shop).subscribe({
      next: (it: Shop) => {
        this.toastService.success({detail: "Informace", summary: "Uložení proběhlo v pořádku", duration: 3000});
        this.router.navigate(['detailshop/' + it.shopId]);
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
      && this.sizeCtrl.value !== null && this.sizeCtrl.value !== ''
      && this.streetCtrl.value !== null && this.streetCtrl.value !== ''
      && this.cityCtrl.value !== null && this.cityCtrl.value !== ''
      && this.postcodeCtrl.value !== null && this.postcodeCtrl.value !== ''
      && this.countryCtrl.value !== null && this.countryCtrl.value !== ''
    );
  }

}
