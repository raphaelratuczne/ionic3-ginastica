import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { EmpresaEmailFormPage } from './empresa-email-form';

@NgModule({
  declarations: [
    EmpresaEmailFormPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpresaEmailFormPage),
    TranslateModule.forChild()
  ],
  exports: [
    EmpresaEmailFormPage
  ]
})
export class EmpresaEmailFormPageModule { }
