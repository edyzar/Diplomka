import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  @Input()
  isAdmin: boolean = false;

  @Input()
  isUserLogged: boolean = false;

  @Input()
  menuItems: MenuItem[] = [];

  @Input()
  username: string;

  menuItemsAdmin: MenuItem[];
  menuItemsUser: MenuItem[];
  menuItemsPublic: MenuItem[];

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.setMenuItemsAdmin();
    this.setMenuItemsUser();
    this.setMenuItemsPublic();
  }

  public login(): void {
    this.loginService.logIn();
  }

  public logout(): void {
    this.loginService.logOut();
  }

  private setMenuItemsAdmin() {
    this.menuItemsAdmin = [
      {
        label: 'Domů',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Zákazník',
        icon: 'pi pi-user',
        items:
          [
            {
              label: 'Vytvořit zákazníka',
              routerLink: '/createuser'
            },
            {
              label: 'Všichni zákazníci',
              routerLink: '/users'
            },
          ]
      },
      {
        label: 'Knihy',
        icon: 'pi pi-book',
        items:
          [
            {
              label: 'Přidat knihu',
              routerLink: '/createbook'
            },
            {
              label: 'Všechny knihy',
              routerLink: '/books'
            },
          ]
      },
      {
        label: 'Obchody',
        icon: 'pi pi-building',
        items:
          [
            {
              label: 'Přidat obchod',
              routerLink: '/createshop'
            },
            {
              label: 'Všechny obchody',
              routerLink: '/shops'
            },
          ]
      },
      {
        label: 'Statistiky',
        icon: 'pi pi-chart-bar',
        routerLink: '/stats'
      }
    ];
  }

  private setMenuItemsUser() {
    this.menuItemsUser = [
      {
        label: 'Domů',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Zákazník',
        icon: 'pi pi-user',
        items:
          [
            {
              label: 'Všichni zákazníci',
              routerLink: '/users'
            }
          ]
      },
      {
        label: 'Knihy',
        icon: 'pi pi-book',
        items:
          [
            {
              label: 'Všechny knihy',
              routerLink: '/books'
            },
          ]
      },
      {
        label: 'Obchody',
        icon: 'pi pi-building',
        items:
          [
            {
              label: 'Všechny obchody',
              routerLink: '/shops'
            },
          ]
      },
      {
        label: 'Statistiky',
        icon: 'pi pi-chart-bar',
        routerLink: '/stats'
      }
    ];
  }

  private setMenuItemsPublic() {
    this.menuItemsPublic = [
      {
        label: 'Domů',
        icon: 'pi pi-home',
        routerLink: '/'
      }
    ];
  }

}
