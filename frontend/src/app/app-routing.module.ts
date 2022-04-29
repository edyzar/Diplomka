import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./user/users/users.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {HomeComponent} from "./home/home.component";
import {BooksComponent} from "./book/books/books.component";
import {ShopsComponent} from "./shop/shops/shops.component";
import {DetailUserComponent} from "./user/detail-user/detail-user.component";
import {CreateUserComponent} from "./user/create-user/create-user.component";
import {DetailBookComponent} from "./book/detail-book/detail-book.component";
import {CreateBookComponent} from "./book/create-book/create-book.component";
import {DetailShopComponent} from "./shop/detail-shop/detail-shop.component";
import {CreateShopComponent} from "./shop/create-shop/create-shop.component";
import {StatsComponent} from "./stats/stats.component";
import {SecurityService} from "./service/security.service";

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [SecurityService],
    data: {requiredRoles: ['role_admin', 'role_user']}
  },
  {
    path: 'detailuser/:id',
    component: DetailUserComponent,
    canActivate: [SecurityService],
    data: {requiredRoles: ['role_admin']}
  },
  {
    path: 'createuser',
    component: CreateUserComponent,
    canActivate: [SecurityService],
    data: {requiredRoles: ['role_admin']}
  },
  {
    path: 'books',
    component: BooksComponent,
    canActivate: [SecurityService],
    data: {requiredRoles: ['role_admin', 'role_user']}
  },
  {
    path: 'detailbook/:id',
    component: DetailBookComponent,
    canActivate: [SecurityService],
    data: {requiredRoles: ['role_admin', 'role_user']}
  },
  {
    path: 'createbook',
    component: CreateBookComponent,
    canActivate: [SecurityService],
    data: {requiredRoles: ['role_admin']}
  },
  {
    path: 'shops',
    component: ShopsComponent,
    canActivate: [SecurityService],
    data: {requiredRoles: ['role_admin', 'role_user']}
  },
  {
    path: 'detailshop/:id',
    component: DetailShopComponent,
    canActivate: [SecurityService],
    data: {requiredRoles: ['role_admin', 'role_user']}
  },
  {
    path: 'createshop',
    component: CreateShopComponent,
    canActivate: [SecurityService],
    data: {requiredRoles: ['role_admin']}
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [SecurityService],
    data: {requiredRoles: ['role_admin', 'role_user']}
  },
  {path: '', component: HomeComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
