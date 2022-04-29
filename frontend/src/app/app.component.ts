import {Component} from '@angular/core';
import {AuthConfig, NullValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {LoginService} from "./service/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  isUserLogged: boolean = false;
  isAdmin: boolean = false;

   constructor(private oAuthService: OAuthService, private loginService: LoginService) {
    this.configure();
  }

  //nastavení propojení s Keycloakem
  authCodeFlowConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/diplomka-realm',
    redirectUri: window.location.origin,
    clientId: 'diplomka-client',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  //konfigurace přihlášení
  configure(): void {
    this.oAuthService.configure(this.authCodeFlowConfig);
    this.oAuthService.tokenValidationHandler = new NullValidationHandler();
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocument().then(() => this.oAuthService.tryLogin())
      .then(() => {
        if(this.oAuthService.getIdentityClaims()) {
          this.isAdmin = this.loginService.hasAdminRole();
          this.isUserLogged = this.loginService.isAnyUserLogged();
        }
      });
  }



}
