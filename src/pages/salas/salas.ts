import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

import { Sala } from '../../models/sala';
import { SalaProvider } from '../../providers/sala.provider';

@IonicPage()
@Component({
  selector: 'page-salas',
  templateUrl: 'salas.html'
})
export class SalasPage {

  public salas: Observable<Sala[]>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private salaProvider: SalaProvider,
    private app: App,
    private translate: TranslateService
  ) { }

  ionViewDidLoad() {
    this.salas = this.salaProvider.lista();
  }

  addItem() {
    let addModal = this.modalCtrl.create('SalaFormPage');
    addModal.onDidDismiss(sala => {
      if (sala) {
        this.salaProvider.adicionar(sala);
      }
    })
    addModal.present();
  }

  editItem(sala:Sala) {
    let addModal = this.modalCtrl.create('SalaFormPage', { item: sala });
    addModal.onDidDismiss(sala => {
      if (sala) {
        this.salaProvider.editar(sala);
      }
    })
    addModal.present();
  }

  deleteItem(sala:Sala) {
    this.translate.get(['AREA_DELETE_TITLE','AREA_DELETE_MESSAGE','AREA_DELETE_YES','AREA_DELETE_NO']).subscribe(values => {
      let confirm = this.alertCtrl.create({
        title: values.AREA_DELETE_TITLE,
        message: values.AREA_DELETE_MESSAGE,
        buttons: [
          {
            text: values.AREA_DELETE_NO,
            handler: () => {}
          },
          {
            text: values.AREA_DELETE_YES,
            handler: () => {
              this.salaProvider.excluir(sala);
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
