import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';

import { NgZoroModulesComponents } from './modules/ngzoro-modules-component';
import { NgxModulesComponents } from './modules/ngx-modules-component';
import { AuthPagesModule } from './pages/auth-pages/auth-pages.module';
import { AdminPagesModule } from './pages/admin-pages/admin-pages.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NotificationModule } from './modules/notification.module';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NgZoroModulesComponents,
    NgxModulesComponents,
    NotificationModule,
    AuthPagesModule,
    AdminPagesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NZ_I18N, useValue: es_ES }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
