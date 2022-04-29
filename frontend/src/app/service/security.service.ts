import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from "./login.service";
import {NgToastService} from "ng-angular-popup";

@Injectable({
  providedIn: 'root'
})
export class SecurityService implements CanActivate {

  canAcitvate: boolean;

  constructor(private loginService: LoginService, private router: Router, private toastService: NgToastService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const requiredRoles = next.data['requiredRoles'];
    const keycloakRealmRole: string = this.loginService.hasAdminRole() ? 'role_admin' : 'role_user';

    if (!this.loginService.isAnyUserLogged()) {
      this.router.navigate(['/']);
      this.toastService.error({
        detail: "Chyba",
        summary: "Pro vstup je nutné se přihlásit.",
        duration: 3000
      })
      this.canAcitvate = false;
      return this.canAcitvate;
    }

    if (requiredRoles.indexOf(keycloakRealmRole) === -1) {
      this.router.navigate(['/']);
      this.toastService.error({
        detail: "Chyba",
        summary: "Pro vstup je nutné mít vhodná oprávnění.",
        duration: 3000
      })
      this.canAcitvate = false;
      return this.canAcitvate;
    }

    this.canAcitvate = true;

    return this.canAcitvate;
  }

}
