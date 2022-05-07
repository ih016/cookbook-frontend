import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: `${environment.authority}`,
        redirectUrl: `${environment.baseURL}/oidc/callback`,
        postLoginRoute: '/app/home',
        secureRoutes: [environment.backend],
        postLogoutRedirectUri: '/loggedout',
        clientId: `${environment.clientId}`,
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
