import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SalaFormPage } from './sala-form';

@NgModule({
  declarations: [
    SalaFormPage,
  ],
  imports: [
    IonicPageModule.forChild(SalaFormPage),
    TranslateModule.forChild()
  ],
  exports: [
    SalaFormPage
  ]
})
export class SalaFormPageModule { }
