import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

import { Falta } from '../../models/falta';
import { FaltaProvider } from '../../providers/falta.provider';

@IonicPage()
@Component({
  selector: 'page-faltas',
  templateUrl: 'faltas.html'
})
export class FaltasPage {

  public faltas: Observable<Falta[]>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private faltaProvider: FaltaProvider,
    private app: App,
    private translate: TranslateService
  ) { }

  ionViewDidLoad() {
    this.faltas = this.faltaProvider.lista();
  }

  addItem() {
    let addModal = this.modalCtrl.create('FaltaFormPage');
    addModal.onDidDismiss(falta => {
      if (falta) {
        this.faltaProvider.adicionar(falta);
      }
    })
    addModal.present();
  }

  editItem(falta:Falta) {
    let addModal = this.modalCtrl.create('FaltaFormPage', { item: falta });
    addModal.onDidDismiss(falta => {
      if (falta) {
        this.faltaProvider.editar(falta);
      }
    })
    addModal.present();
  }

  deleteItem(falta:Falta) {
    this.translate.get(['ABSENCE_DELETE_TITLE','ABSENCE_DELETE_MESSAGE','ABSENCE_DELETE_YES','ABSENCE_DELETE_NO']).subscribe(values => {
      let confirm = this.alertCtrl.create({
        title: values.ABSENCE_DELETE_TITLE,
        message: values.ABSENCE_DELETE_MESSAGE,
        buttons: [
          {
            text: values.ABSENCE_DELETE_NO,
            handler: () => {}
          },
          {
            text: values.ABSENCE_DELETE_YES,
            handler: () => {
              this.faltaProvider.excluir(falta);
            }
          }
        ]
      });
      confirm.present();
    });

  }

  public goToDashboard() {
    this.app.goBack();
  }
}
