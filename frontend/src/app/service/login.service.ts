import {Injectable} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string;

  constructor(private oAuthService: OAuthService) { }

  public logIn(): void {
    this.oAuthService.initImplicitFlowInternal();
  }

  public logOut(): void {
    this.oAuthService.logOut();
  }

  public isAnyUserLogged(): boolean {
    return (this.oAuthService.hasValidIdToken() && this.oAuthService.hasValidAccessToken());
  }

  public hasAdminRole(): boolean {
    this.token = this.oAuthService.getAccessToken();

    if (this.token == null) {
      return false;
    }

    const payload = this.token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    return payloadDecoded.realm_access.roles.indexOf('realm-admin') !== -1;
  }

}
