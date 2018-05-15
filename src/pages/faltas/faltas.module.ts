import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { FaltasPage } from './faltas';

@NgModule({
  declarations: [
    FaltasPage,
  ],
  imports: [
    IonicPageModule.forChild(FaltasPage),
    TranslateModule.forChild()
  ],
  exports: [
    FaltasPage
  ]
})
export class FaltasPageModule { }
