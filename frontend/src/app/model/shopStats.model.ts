import {Book} from "./book.model";

export class ShopStats {
  bookId?: number;
  salesPoints: number;
}

export class ShopStatsModel {
  shopStats: ShopStats;
  book: Book;
}
