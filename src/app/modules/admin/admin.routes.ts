import {Routes} from '@angular/router';

import {AdminComponent} from './admin.component';
import {BrandConfigurationComponent} from './pages/brand-configuration/brand-configuration.component';
import {ModelConfigurationComponent} from './pages/model-configuration/model-configuration.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NewBrandComponent} from './pages/new-brand/new-brand.component';
import {NewModelComponent} from './pages/new-model/new-model.component';
import {BrandReportComponent} from './pages/brand-report/brand-report.component';
import {ModelReportComponent} from './pages/model-report/model-report.component';
import {DateReportComponent} from './pages/date-report/date-report.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: 'resumen', component: DashboardComponent},
      {path: 'marcas', component: BrandConfigurationComponent},
      {path: 'nueva-marca', component: NewBrandComponent},
      {path: 'modelos', component: ModelConfigurationComponent},
      {path: 'nuevo-modelo', component: NewModelComponent},
      {path: 'reporte-marcas', component: BrandReportComponent},
      {path: 'reporte-modelos', component: ModelReportComponent},
      {path: 'reporte-fecha', component: DateReportComponent},
      {path: '**', redirectTo: 'resumen', pathMatch: 'full'}
    ]
  }
];
