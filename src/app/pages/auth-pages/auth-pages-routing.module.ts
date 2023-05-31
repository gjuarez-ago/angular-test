import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPagesComponent } from './auth-pages.component';
import { LoginComponent } from './login/login.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '', component: AuthPagesComponent, children: [
      // Global pages
      { path: '', pathMatch: 'full', redirectTo: '/login' },
      { path: "login", component: LoginComponent },
      { path: "recovery-password", component: RecoveryPasswordComponent },
      { path: "reset-password/:token/:email", component: ResetPasswordComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthPagesRoutingModule { }
