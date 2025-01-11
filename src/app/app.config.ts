import {ApplicationConfig, importProvidersFrom,} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {IPublicClientApplication, PublicClientApplication} from '@azure/msal-browser';
import {provideClientHydration} from '@angular/platform-browser';
import {MSAL_INSTANCE, MsalService} from '@azure/msal-angular';
import {HTTP_INTERCEPTORS, provideHttpClient} from '@angular/common/http';
import {AuthInterceptorInterceptor} from './core/interceptors/auth-interceptor.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


export function MSALFactory(): IPublicClientApplication {
  const instance = new PublicClientApplication({
    auth: {
      clientId: '89cf3309-ea83-4b1b-9cc4-bd2912b81458',
      redirectUri: 'http://localhost:4200',
      authority: 'https://login.microsoftonline.com/9bf0165c-dde5-43dd-a0cb-14f9aaac4672',
    }
  });
  instance.initialize();
  return instance;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALFactory
    },
    MsalService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true },
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule,),
  ]
};
