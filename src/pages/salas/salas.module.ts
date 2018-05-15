import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SalasPage } from './salas';

@NgModule({
  declarations: [
    SalasPage,
  ],
  imports: [
    IonicPageModule.forChild(SalasPage),
    TranslateModule.forChild()
  ],
  exports: [
    SalasPage
  ]
})
export class SalasPageModule { }
