import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { EmpresasPage } from './empresas';

@NgModule({
  declarations: [
    EmpresasPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpresasPage),
    TranslateModule.forChild()
  ],
  exports: [
    EmpresasPage
  ]
})
export class EmpresasPageModule { }
