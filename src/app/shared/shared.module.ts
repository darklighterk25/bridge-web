import {NgModule} from '@angular/core';
import {CarCardModule} from './components/car-card/car-card.module';
import {QualificationModule} from './components/qualification/qualification.module';

@NgModule({
  declarations: [],
  imports: [CarCardModule, QualificationModule],
  exports: [CarCardModule, QualificationModule],
  providers: [],
  bootstrap: []
})
export class SharedModule {
}
