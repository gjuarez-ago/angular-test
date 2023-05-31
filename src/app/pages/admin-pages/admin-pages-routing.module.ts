import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPagesComponent } from './admin-pages.component';
import { DashboardAdminPageComponent } from './dashboard-admin-page/dashboard-admin-page.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { SideMenuComponent } from 'src/app/components/side-menu/side-menu.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ValidateElementsComponent } from './validate-elements/validate-elements.component';

const routes: Routes = [
  {
    path: "admin", component: SideMenuComponent, children: [
      { path: "dashboard", component: DashboardAdminPageComponent },
      { path: "categories", component: AdminCategoriesComponent }, 
      { path: "validate-elements", component: ValidateElementsComponent }, 
    ],
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
