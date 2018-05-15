import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { FaltaFormPage } from './falta-form';

@NgModule({
  declarations: [
    FaltaFormPage,
  ],
  imports: [
    IonicPageModule.forChild(FaltaFormPage),
    TranslateModule.forChild()
  ],
  exports: [
    FaltaFormPage
  ]
})
export class FaltaFormPageModule { }
