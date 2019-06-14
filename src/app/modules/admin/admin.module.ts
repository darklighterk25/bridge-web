import {NgModule} from '@angular/core';

import {AdminComponent} from './admin.component';
import {AngularMaterialModule} from '../angular-material.module';
import { BrandConfigurationComponent } from './pages/brand-configuration/brand-configuration.component';
import { ModelConfigurationComponent } from './pages/model-configuration/model-configuration.component';
import {AppRoutingModule} from '../../app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewBrandComponent } from './pages/new-brand/new-brand.component';
import { NewModelComponent } from './pages/new-model/new-model.component';
import { BrandReportComponent } from './pages/brand-report/brand-report.component';
import { ModelReportComponent } from './pages/model-report/model-report.component';
import { DateReportComponent } from './pages/date-report/date-report.component';

@NgModule({
  declarations: [
    AdminComponent,
    BrandConfigurationComponent,
    ModelConfigurationComponent,
    DashboardComponent,
    NewBrandComponent,
    NewModelComponent,
    BrandReportComponent,
    ModelReportComponent,
    DateReportComponent
  ],
  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule {
}
