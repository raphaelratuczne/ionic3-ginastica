import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AulaFormPage } from './aula-form';

@NgModule({
  declarations: [
    AulaFormPage,
  ],
  imports: [
    IonicPageModule.forChild(AulaFormPage),
    TranslateModule.forChild()
  ],
  exports: [
    AulaFormPage
  ]
})
export class AulaFormPageModule { }
