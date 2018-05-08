import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AulasPage } from './aulas';

@NgModule({
  declarations: [
    AulasPage,
  ],
  imports: [
    IonicPageModule.forChild(AulasPage),
    TranslateModule.forChild()
  ],
  exports: [
    AulasPage
  ]
})
export class AulasPageModule { }
