import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './modules/login/login.component';
import {HomeComponent} from './modules/home/home.component';
import {AuthGuard} from './core/auth.guard';
import {UsuariosComponent} from './modules/home/usuarios/usuarios.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'home', component: HomeComponent, children: [
      {
        path: 'usuarios',
        component: UsuariosComponent,
      }
    ], canActivate: [AuthGuard]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
