import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';
import {HomeComponent} from './home.component';
import {BadgeModule} from 'primeng/badge';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    HttpClientModule,
    SharedModule,
    BadgeModule,
    OverlayPanelModule,
    ScrollTopModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: []
})
export class HomeModule {
}
