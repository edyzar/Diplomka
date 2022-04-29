import {Book} from "./book.model";

export class CustomerStats {
  bookId?: number;
  numberOfOwners: number;
}

export class CustomerStatsModel {
  customerStats: CustomerStats;
  book: Book;
}
