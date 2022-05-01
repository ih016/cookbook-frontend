import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://auth.hulsbus.be',
        redirectUrl: 'http://localhost:4200/recipes',
        secureRoutes: [environment.baseURL],
        postLogoutRedirectUri: 'login',
        clientId: 'cookbook',
        scope: 'openid profile email offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Warn,
      },
    }),
  ],
})
export class AuthConfigModule { }
