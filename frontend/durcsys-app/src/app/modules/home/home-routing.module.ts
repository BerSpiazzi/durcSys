import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../../core/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    loadChildren: () => import('./usuarios/usuario.module').then(m => m.UsuarioModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
