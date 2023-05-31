
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxModulesComponents } from 'src/app/modules/ngx-modules-component';
import { NgZoroModulesComponents } from 'src/app/modules/ngzoro-modules-component';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { AdminPagesComponent } from './admin-pages.component';
import { DashboardAdminPageComponent } from './dashboard-admin-page/dashboard-admin-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { ValidateElementsComponent } from './validate-elements/validate-elements.component';


@NgModule({
  declarations: [
    AdminPagesComponent,
    DashboardAdminPageComponent,
    AdminCategoriesComponent,
    ValidateElementsComponent
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
export class AdminPagesModule { }
