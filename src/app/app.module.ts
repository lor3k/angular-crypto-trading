import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoinsService } from './coins.service';

registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    CoinsService,
    { provide: LOCALE_ID, useValue: 'pl' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
