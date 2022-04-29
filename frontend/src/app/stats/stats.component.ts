import {ChangeDetectorRef, Component} from '@angular/core';
import {CustomerStatsModel} from '../model/customerStats.model';
import {ShopStatsModel} from "../model/shopStats.model";
import {HttpErrorResponse} from "@angular/common/http";
import {StatsService} from "../service/stats.service";
import {NgToastService} from "ng-angular-popup";
import {Shop} from "../model/shop.model";
import {ShopService} from "../service/shop.service";
import {map} from "rxjs";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  providers: [ShopService, StatsService]
})
export class StatsComponent {

  customerStatsModels: CustomerStatsModel[] = [];
  shopStatsModels: ShopStatsModel[] = [];
  shopsDialog: boolean = false;
  availableInShops: Shop[] = [];
  headerDialog: string = '';

  constructor(private statsService: StatsService, private shopService: ShopService,
              private toastService: NgToastService, private cdr: ChangeDetectorRef) {
    statsService.findAllCustomerStats().subscribe(
      (it: CustomerStatsModel[]) => {
        this.customerStatsModels = it
      }, (error: HttpErrorResponse) => {
        if (error.statusText === 'OK') {
          this.toastService.error({detail: "Chyba", summary: error.error.text, duration: 3000})
        } else {
          this.toastService.error({detail: "Chyba", summary: error.statusText, duration: 3000})
        }
      });

    statsService.findAllShopStats().subscribe(
      (it: ShopStatsModel[]) => {
        this.shopStatsModels = it
      }, (error: HttpErrorResponse) => {
        if (error.statusText === 'OK') {
          this.toastService.error({detail: "Chyba", summary: error.error.text, duration: 3000})
        } else {
          this.toastService.error({detail: "Chyba", summary: error.statusText, duration: 3000})
        }
      });
  }


  closeDialog() {
    this.shopsDialog = false;
    this.availableInShops = [];
    this.cdr.detectChanges();
  }

  showDetail(shopStatsModel: ShopStatsModel) {
    this.shopsDialog = true;
    this.headerDialog = shopStatsModel.book.name;
    this.shopService.findAllShops().pipe(map(it => {
      return it.filter(v => v.bookIds?.includes(shopStatsModel.book.bookId!))
    })).subscribe(
      (it: Shop[]) => {
        this.availableInShops = it
      }, (error: HttpErrorResponse) => {
        if (error.statusText === 'OK') {
          this.toastService.error({detail: "Chyba", summary: error.error.text, duration: 3000})
        } else {
          this.toastService.error({detail: "Chyba", summary: error.statusText, duration: 3000})
        }
      });
  }
}
