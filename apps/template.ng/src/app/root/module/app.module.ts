import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';

import { ConfigService } from '../../shared/services/config/config.service';
import { SafeCookieService } from '../../shared/services/safe-cookie/safe-cookie.service';
import { AppComponent } from '../components/app/app.component';
import { CopyrightComponent } from '../components/copyright/copyright.component';
import { AppRoutingModule } from '../routing/routing.module';

// on application startup:
export function initialize(configService: ConfigService) {
  // loads the configuration:
  return () => {
    configService;
  };
}

@NgModule({
  declarations: [AppComponent, CopyrightComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    // third party
    FontAwesomeModule,
  ],
  providers: [
    CookieService,
    SafeCookieService,
    ConfigService,

    // call the initialize function on application startup(APP_INITIALIZER) with the config service as parameter:
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [ConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
