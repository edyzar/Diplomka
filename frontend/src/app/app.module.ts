import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ButtonModule} from "primeng/button";
import {UsersComponent} from './user/users/users.component';
import {AppRoutingModule} from "./app-routing.module";
import {NotFoundComponent} from './not-found/not-found.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MenubarModule} from "primeng/menubar";
import {HomeComponent} from './home/home.component';
import {SharedModule} from "primeng/api";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {OAuthModule} from "angular-oauth2-oidc";
import {MenuComponent} from './menu/menu.component';
import {BooksComponent} from './book/books/books.component';
import {ShopsComponent} from './shop/shops/shops.component';
import {TableModule} from "primeng/table";
import {NgToastModule} from 'ng-angular-popup';
import {CreateUserComponent} from './user/create-user/create-user.component';
import {DetailUserComponent} from './user/detail-user/detail-user.component';
import {CreateBookComponent} from './book/create-book/create-book.component';
import {DetailBookComponent} from './book/detail-book/detail-book.component';
import {DetailShopComponent} from './shop/detail-shop/detail-shop.component';
import {CreateShopComponent} from './shop/create-shop/create-shop.component';
import {StatsComponent} from './stats/stats.component';
import {RippleModule} from "primeng/ripple";
import {StyleClassModule} from "primeng/styleclass";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DropdownModule} from "primeng/dropdown";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NotFoundComponent,
    HomeComponent,
    MenuComponent,
    BooksComponent,
    ShopsComponent,
    CreateUserComponent,
    DetailUserComponent,
    CreateBookComponent,
    DetailBookComponent,
    DetailShopComponent,
    CreateShopComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    NgToastModule,
    MenubarModule,
    SharedModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8083/v1/user'],
        sendAccessToken: true
      },
    }),
    TableModule,
    RippleModule,
    StyleClassModule,
    ToolbarModule,
    DialogModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
