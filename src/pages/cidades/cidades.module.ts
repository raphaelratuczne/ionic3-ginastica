import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CidadesPage } from './cidades';

@NgModule({
  declarations: [
    CidadesPage,
  ],
  imports: [
    IonicPageModule.forChild(CidadesPage),
    TranslateModule.forChild()
  ],
  exports: [
    CidadesPage
  ]
})
export class CidadesPageModule { }
