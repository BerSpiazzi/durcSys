import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './modules/login/login.component';
import {HomeComponent} from './modules/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {Ripple} from 'primeng/ripple';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    Ripple,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
