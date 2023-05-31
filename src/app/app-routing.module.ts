import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPagesRoutingModule } from './pages/admin-pages/admin-pages-routing.module';
import { AuthPagesRoutingModule } from './pages/auth-pages/auth-pages-routing.module';
import { AuthPagesComponent } from './pages/auth-pages/auth-pages.component';

const routes: Routes = [
  {path: '**', component: AuthPagesComponent,  redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),
    AuthPagesRoutingModule,
    AdminPagesRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
