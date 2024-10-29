import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './modules/login/login.component';
import {HomeComponent} from './modules/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Ripple} from 'primeng/ripple';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TableModule} from "primeng/table";
import {UsuariosComponent} from './modules/home/usuarios/usuarios.component';
import {UsuarioEditComponent} from './modules/home/usuarios/edit/usuario-edit.component';
import {HttpIntercept} from './core/http.intercept';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsuariosComponent,
    UsuarioEditComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    Ripple,
    OverlayPanelModule,
    TableModule,
  ],
  exports: [
    UsuarioEditComponent,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpIntercept, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
