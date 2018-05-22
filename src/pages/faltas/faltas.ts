import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Falta } from '../../models/falta';
import { FaltaProvider } from '../../providers/falta.provider';

@IonicPage()
@Component({
  selector: 'page-faltas',
  templateUrl: 'faltas.html'
})
export class FaltasPage {

  currentItems = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private faltaProvider: FaltaProvider
  ) {
    // this.currentItems = this.items.query();
    // empresa-form

  }

  ionViewDidLoad() {
    this.currentItems = this.faltaProvider.lista();
  }

  addItem() {
    let addModal = this.modalCtrl.create('FaltaFormPage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.currentItems.push(item);
      }
    })
    addModal.present();
  }

  editItem(item) {
    let addModal = this.modalCtrl.create('FaltaFormPage', { item: item });
    addModal.onDidDismiss(item => {
      if (item) {
        this.currentItems.push(item);
      }
    })
    addModal.present();
  }

  deleteItem(item) {
    // this.items.delete(item);
    let confirm = this.alertCtrl.create({
      title: 'Excluir Falta',
      message: 'Tem certeza que deseja excluir essa falta?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Excluir',
          handler: () => {
            this.currentItems.splice(this.currentItems.indexOf(item), 1);
          }
        }
      ]
    });
    confirm.present();
  }

}
