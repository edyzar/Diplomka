import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {Shop, ShopModel} from "../model/shop.model";

@Injectable()
export class ShopService {

  private readonly apiUrl = 'http://localhost:8083/v1/shop';

  constructor(private http: HttpClient) {
  }

  saveShop(book: Shop): Observable<Shop> {
    return this.http.post<Shop>(this.apiUrl + '/', book);
  }

  shopWithBooksDetail(id: number): Observable<ShopModel> {
    return this.http.get<ShopModel>(this.apiUrl + '/detail/' + id);
  }

  findAllShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.apiUrl + '/all');
  }

  deleteShopById(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

}
