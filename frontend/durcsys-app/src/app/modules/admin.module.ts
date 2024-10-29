import {NgModule} from '@angular/core';
import {AdminRoutingModule} from './admin-routing.module';
import {SharedModule} from '../shared/shared.module';
import {Ripple} from 'primeng/ripple';

@NgModule({
  declarations: [],
  imports: [
    AdminRoutingModule,
    SharedModule,
    Ripple,
  ],
  providers: [],
  bootstrap: []
})
export class AdminModule {
}
