import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {UsuarioRoutingModule} from "./usuario-routing.module";
import {UsuarioNovoComponent} from './novo/usuario-novo.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ChipsModule} from 'primeng/chips';
import {SharedModule} from '../../../shared/shared.module';
import {UsuarioEditComponent} from './edit/usuario-edit.component';
import {UsuariosComponent} from './usuarios.component';
import {TableModule} from 'primeng/table';
import {Ripple} from 'primeng/ripple';

@NgModule({

  declarations: [
    UsuarioNovoComponent,
    UsuarioEditComponent,
    UsuariosComponent
  ],
  imports: [
    HttpClientModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    ChipsModule,
    SharedModule,
    TableModule,
    Ripple,

  ],
  exports: [
    UsuarioNovoComponent,
    UsuarioEditComponent,
    UsuariosComponent
  ]

})
export class UsuarioModule {
}
