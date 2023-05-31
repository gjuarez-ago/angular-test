
import { AuthPagesRoutingModule } from './auth-pages-routing.module';
import { AuthPagesComponent } from './auth-pages.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxModulesComponents } from 'src/app/modules/ngx-modules-component';
import { NgZoroModulesComponents } from 'src/app/modules/ngzoro-modules-component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AuthPagesComponent,
    LoginComponent,
    ResetPasswordComponent,
    RecoveryPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxModulesComponents,
    NgZoroModulesComponents,
    ]
})
export class AuthPagesModule { }
