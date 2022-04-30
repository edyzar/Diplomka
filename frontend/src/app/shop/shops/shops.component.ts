import {Component, OnInit} from '@angular/core';
import {Shop} from "../../model/shop.model";
import {ShopService} from '../../service/shop.service';
import {NgToastService} from "ng-angular-popup";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
  providers: [ShopService]
})
export class ShopsComponent implements OnInit {

  shops: Shop[] = [];

  isAdmin: boolean = false;

  constructor(private shopService: ShopService, private toastService: NgToastService, private loginService: LoginService) {
    shopService.findAllShops().subscribe({
      next: (it: Shop[]) => this.shops = it,
      error: (error: HttpErrorResponse) => {
        if (error.statusText === 'OK') {
          this.toastService.error({detail: "Chyba", summary: error.error.text, duration: 3000})
        } else {
          this.toastService.error({detail: "Chyba", summary: error.statusText, duration: 3000})
        }
      }
    });
  }

  deleteShop(shopId: number) {
    this.shopService.deleteShopById(shopId).subscribe({
      next: () => this.toastService.success({
          detail: "Informace",
          summary: "Odebrání obchodu proběhlo v pořádku",
          duration: 3000
        }),
      error: (error: HttpErrorResponse) => this.toastService.error({
        detail: "Chyba",
        summary: error.statusText,
        duration: 3000
      })
    });
  }

  ngOnInit(): void {
    this.isAdmin = this.loginService.hasAdminRole();
  }

}
