import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {ChatComponent} from './chat.component';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    AngularMaterialModule
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule {
}
