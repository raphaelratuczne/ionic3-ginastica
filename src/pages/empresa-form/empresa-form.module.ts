import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { EmpresaFormPage } from './empresa-form';

@NgModule({
  declarations: [
    EmpresaFormPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpresaFormPage),
    TranslateModule.forChild()
  ],
  exports: [
    EmpresaFormPage
  ]
})
export class EmpresaFormPageModule { }
