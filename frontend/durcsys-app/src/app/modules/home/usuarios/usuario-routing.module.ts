import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UsuarioNovoComponent} from './novo/usuario-novo.component';
import {UsuariosComponent} from './usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent
  },
  {
    path: 'novo',
    component: UsuarioNovoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {
}
