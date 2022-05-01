import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://auth.hulsbus.be',
        redirectUrl: 'http://localhost:4200/recipes',
        postLogoutRedirectUri: 'login',
        clientId: 'cookbook',
        scope: 'openid profile email offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
  ],
})
export class AuthConfigModule { }
