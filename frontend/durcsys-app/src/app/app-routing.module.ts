import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin.module').then(module => module.AdminModule),
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
