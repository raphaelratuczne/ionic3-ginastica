import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CidadeFormPage } from './cidade-form';

@NgModule({
  declarations: [
    CidadeFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CidadeFormPage),
    TranslateModule.forChild()
  ],
  exports: [
    CidadeFormPage
  ]
})
export class CidadeFormPageModule { }
