import {Book} from "./book.model";

export class Shop {
  shopId?: number;
  size: number;
  name: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
  bookIds?: number[];
}

export class ShopModel {
  shop: Shop
  books?: Book[];
}
