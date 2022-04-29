import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShopStatsModel} from "../model/shopStats.model";
import {CustomerStatsModel} from "../model/customerStats.model";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private readonly apiUrlCustomerStats = 'http://localhost:8083/v1/customerstats';
  private readonly apiUrlShopStats = 'http://localhost:8083/v1/shopstats';

  constructor(private http: HttpClient) {
  }

  findAllCustomerStats(): Observable<CustomerStatsModel[]> {
    return this.http.get<CustomerStatsModel[]>(this.apiUrlCustomerStats + '/all');
  }

  findAllShopStats(): Observable<ShopStatsModel[]> {
    return this.http.get<ShopStatsModel[]>(this.apiUrlShopStats + '/all');
  }

}
